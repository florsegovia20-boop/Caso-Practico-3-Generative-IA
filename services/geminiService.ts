import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("La variable de entorno API_KEY no está configurada.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateMarketingCopy = async (
  prompt: string,
  mode: 'improve' | 'summarize' | 'expand' | 'variations',
  context?: string
): Promise<string> => {
  const ai = getClient();
  const model = "gemini-2.5-flash";

  let systemInstruction = "Eres un redactor experto en marketing de clase mundial. Debes responder siempre en español.";
  let finalPrompt = "";

  switch (mode) {
    case 'improve':
      systemInstruction += " Tu objetivo es corregir la gramática, mejorar la fluidez y hacer que el tono sea más persuasivo.";
      finalPrompt = `Mejora este texto:\n\n${prompt}`;
      break;
    case 'summarize':
      systemInstruction += " Resume los puntos clave de venta de manera concisa.";
      finalPrompt = `Resume este texto:\n\n${prompt}`;
      break;
    case 'expand':
      systemInstruction += " Expande estas ideas con un toque creativo de marketing.";
      finalPrompt = `Expande este texto:\n\n${prompt}`;
      break;
    case 'variations':
      systemInstruction += " Proporciona 3 variaciones tonales distintas (ej. Profesional, Juguetón, Urgente).";
      finalPrompt = `Crea variaciones para:\n\n${prompt}`;
      break;
  }

  if (context) {
    finalPrompt += `\n\nContexto/Guías de Marca: ${context}`;
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: finalPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "No se generó contenido.";
  } catch (error) {
    console.error("Error en Generación de Texto:", error);
    throw error;
  }
};

export const generateMarketingImage = async (
  prompt: string,
  style: string
): Promise<string> => {
  const ai = getClient();
  // Usando gemini-2.5-flash-image para tareas generales de generación de imágenes
  const model = "gemini-2.5-flash-image";

  const fullPrompt = `Create a high-quality marketing image. Style: ${style}. Description: ${prompt}`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: fullPrompt,
    });

    // Extraer imagen de la respuesta
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No se encontraron datos de imagen en la respuesta");
  } catch (error) {
    console.error("Error en Generación de Imagen:", error);
    throw error;
  }
};