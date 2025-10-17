import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisReportData } from "../types";

// FIX: Initialize GoogleGenAI with API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// FIX: Define the response schema based on the types in types.ts
const categorySchema = {
    type: Type.OBJECT,
    properties: {
        score: { type: Type.INTEGER, description: "Puntuación de la categoría (0-100)." },
        summary: { type: Type.STRING, description: "Resumen de la evaluación de la categoría." },
        findings: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    line: { type: Type.INTEGER, description: "Número de línea del hallazgo." },
                    description: { type: Type.STRING, description: "Descripción del hallazgo." },
                    severity: { type: Type.STRING, enum: ['Crítica', 'Alta', 'Media', 'Baja'], description: "Severidad del hallazgo." }
                },
                required: ["line", "description", "severity"]
            }
        }
    },
    required: ["score", "summary", "findings"]
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        healthScore: { type: Type.INTEGER, description: "Puntuación general de salud del código del 1 al 100." },
        highlights: {
            type: Type.OBJECT,
            properties: {
                positive: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lista de aspectos positivos del código." },
                negative: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lista de áreas a mejorar." },
            },
            required: ["positive", "negative"]
        },
        security: categorySchema,
        performance: categorySchema,
        refactoring: categorySchema,
        technicalDebt: categorySchema,
        costAnalysis: {
            type: Type.OBJECT,
            properties: {
                estimatedCost: { type: Type.STRING, description: "Costo estimado de remediación en USD (p.ej. '$500 - $1500')." },
                summary: { type: Type.STRING, description: "Breve explicación de cómo se calculó el costo." },
                costReductionStrategies: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            strategy: { type: Type.STRING },
                            description: { type: Type.STRING },
                            impact: { type: Type.STRING, enum: ['Alto', 'Medio', 'Bajo'] }
                        },
                        required: ["strategy", "description", "impact"]
                    }
                }
            },
            required: ["estimatedCost", "summary", "costReductionStrategies"]
        }
    },
    required: ["healthScore", "highlights", "security", "performance", "refactoring", "technicalDebt", "costAnalysis"]
};


const createAnalysisPrompt = (code: string, context?: string) => `
Analiza el siguiente fragmento de código.
${context ? `Ten en cuenta el siguiente contexto: ${context}.` : ''}
Proporciona un informe de auditoría completo en formato JSON.

El análisis debe cubrir las siguientes categorías:
1.  **Seguridad**: Vulnerabilidades potenciales, malas prácticas de seguridad (p. ej., inyección de SQL, XSS, secretos hardcodeados).
2.  **Rendimiento**: Cuellos de botella, bucles ineficientes, problemas de memoria, operaciones lentas.
3.  **Refactorización**: Código duplicado, funciones largas, mala legibilidad, oportunidades para mejorar el diseño.
4.  **Deuda Técnica**: Hacks, soluciones temporales, código comentado, dependencias obsoletas.

Para cada categoría, proporciona:
-   Una **puntuación** del 0 al 100.
-   Un **resumen** conciso de la evaluación.
-   Una lista de **hallazgos** específicos, cada uno con:
    -   'line': El número de línea donde se encontró el problema.
    -   'description': Una descripción clara del problema.
    -   'severity': La severidad ('Crítica', 'Alta', 'Media', 'Baja').

Además, proporciona:
-   'healthScore': Una puntuación general de salud del código (0-100), promediando las puntuaciones de las categorías.
-   'highlights': Un resumen de los puntos clave.
    -   'positive': Lista de 3-4 puntos fuertes o buenas prácticas encontradas.
    -   'negative': Lista de 3-4 áreas críticas que necesitan atención inmediata.
-   'costAnalysis': Un análisis del costo de remediación.
    -   'estimatedCost': Un rango de costo estimado para arreglar los problemas (p. ej., "$500 - $1500").
    -   'summary': Una breve explicación de cómo se calculó el costo (p. ej., basado en horas de desarrollador estimadas).
    -   'costReductionStrategies': Estrategias para reducir el costo, cada una con:
        -   'strategy': El nombre de la estrategia.
        -   'description': Una explicación de la estrategia.
        -   'impact': El impacto de la reducción de costos ('Alto', 'Medio', 'Bajo').

Si no hay hallazgos para una categoría, devuelve una lista vacía de 'findings'.

Aquí está el código:
\`\`\`
${code}
\`\`\`
`;

export const analyzeCode = async (code: string, context?: string): Promise<AnalysisReportData> => {
    try {
        // FIX: Use the correct method to generate content with a specified model and prompt.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro', // Using a powerful model for complex code analysis
            contents: createAnalysisPrompt(code, context),
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.1, // Lower temperature for more deterministic, factual output
            }
        });

        // FIX: Directly access the 'text' property for the response.
        const jsonText = response.text;
        
        try {
            return JSON.parse(jsonText);
        } catch (e) {
            console.error("Failed to parse JSON response:", jsonText);
            throw new Error("La respuesta de la API no es un JSON válido.");
        }

    } catch (error) {
        console.error("Error analyzing code with Gemini API:", error);
        // FIX: Provide a more user-friendly error message.
        throw new Error("Error al analizar el código. Por favor, inténtalo de nuevo.");
    }
};