const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Generar un tutorial de cursos con los siguientes detalles en formato JSON. El nombre del curso debe estar en el campo descripcion, junto con el nombre del capítulo, sobre la duración:\n\nCategoría: \"programación\"\nTítulo: \"Python\"\nDificultad: \"básica\"\nDuración total: \"1 hora\"\nNúmero de capítulos: 5\nCada capítulo debe tener un nombre único y adecuado para realizar consultas en YouTube, y la duración de cada capítulo debe ser determinada de forma apropiada. El formato JSON debe ser el siguiente:\n{\n  \"curso\": {\n    \"nombre\": \"Python\",\n    \"descripcion\": \"Curso de Python - Programación básica\",\n    \"capitulos\": [\n      {\n        \"nombre\": \"Introducción a Python\",\n        \"descripcion\": \"Curso de Python: Introducción a Python - Aprender los conceptos básicos\",\n        \"duracion\": \"15 minutos\"\n      },\n      {\n        \"nombre\": \"Variables y Tipos de Datos\",\n        \"descripcion\": \"Curso de Python: Variables y Tipos de Datos - Explicación de los fundamentos\",\n        \"duracion\": \"12 minutos\"\n      },\n      {\n        \"nombre\": \"Control de Flujo\",\n        \"descripcion\": \"Curso de Python: Control de Flujo - Condicionales y bucles\",\n        \"duracion\": \"10 minutos\"\n      },\n      {\n        \"nombre\": \"Funciones y Módulos\",\n        \"descripcion\": \"Curso de Python: Funciones y Módulos - Cómo crear y usar funciones\",\n        \"duracion\": \"12 minutos\"\n      },\n      {\n        \"nombre\": \"Manejo de Errores y Excepciones\",\n        \"descripcion\": \"Curso de Python: Manejo de Errores y Excepciones - Tratamiento de errores en código\",\n        \"duracion\": \"11 minutos\"\n      }\n    ],\n    \"categoria\": \"programación\",\n    \"titulo\": \"Python\",\n    \"dificultad\": \"básica\",\n    \"duracion\": \"1 hora\",\n    \"numeroCapitulos\": 5\n  }\n}\n",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "categoria programacion\nduracion 2 hora\ntitulo angular\nDificultad avanzado\nnumero de capitulos 6"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\"curso\": {\"nombre\": \"Angular\", \"descripcion\": \"Curso de Angular - Desarrollo web avanzado\", \"capitulos\": [{\"nombre\": \"Introducción a Angular\", \"descripcion\": \"Curso de Angular: Introducción a Angular - Aprender los conceptos básicos\", \"duracion\": \"20 minutos\"}, {\"nombre\": \"Componentes y Templates\", \"descripcion\": \"Curso de Angular: Componentes y Templates - Cómo construir interfaces de usuario\", \"duracion\": \"20 minutos\"}, {\"nombre\": \"Directivas y Pipes\", \"descripcion\": \"Curso de Angular: Directivas y Pipes - Manipulación del DOM y transformación de datos\", \"duracion\": \"15 minutos\"}, {\"nombre\": \"Servicios y Dependencia de Inyección\", \"descripcion\": \"Curso de Angular: Servicios y Dependencia de Inyección - Cómo gestionar la lógica del negocio\", \"duracion\": \"20 minutos\"}, {\"nombre\": \"Rutas y Navegación\", \"descripcion\": \"Curso de Angular: Rutas y Navegación - Cómo crear aplicaciones de múltiples páginas\", \"duracion\": \"15 minutos\"}, {\"nombre\": \"Pruebas Unitarias y de Integración\", \"descripcion\": \"Curso de Angular: Pruebas Unitarias y de Integración - Cómo asegurar la calidad del código\", \"duracion\": \"20 minutos\"}], \"categoria\": \"programacion\", \"titulo\": \"Angular\", \"dificultad\": \"avanzado\", \"duracion\": \"2 horas\", \"numeroCapitulos\": 6}}\n\n```"},
          ],
        },
      ],
    });