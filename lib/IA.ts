const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "generar un tutorial de cursos con los siguientes detalles, con el nombre del curso en el campo descripción junto con el nombre del capítulo sobre duración: categoría: 'progrmacion', título: python, dificultad: básica, duración: 1 horas, número de capítulos: 5 capítulos en formato json\n\n{\ncurso:{\nnombre:\"\",\ndescripcion:\"\",\ncapitulos: [{\nnombre:\"\",\ndescripcion:\"\",\nduracion:\"15 minutos\"\n},\n{\nnombre:\"\",\ndescripcion:\"\",\ncapitulos: [{\nnombre:\"\",\ndescripcion:\"\",\nduracion:\"15 minutos\"\n},\n{\nnombre:\"\",\ndescripcion:\"\",\ncapitulos: [{\nnombre:\"\",\ndescripcion:\"\",\nduracion:\"15 minutos\"\n},\n{\nnombre:\"\",\ndescripcion:\"\",\ncapitulos: [{\nnombre:\"\",\ndescripcion:\"\",\nduracion:\"15 minutos\"\n}],categoria:\"\",\nTitulo:\"\",\nDificultad:\"\",\nDuracion:\"\",\nnumCapitulos: 4\n}\n}",
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
      history: [
        {
          role: "user",
          parts: [
            {text: "categoria programacion \nduracion 1 hora\ntitulo sql\nDificultad principiante\nnumero de capitulos 5"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\"curso\": {\"nombre\": \"SQL\", \"descripcion\": \"Curso de SQL para principiantes\", \"capitulos\": [{\"nombre\": \"Introducción a SQL\", \"descripcion\": \"Introducción a SQL: curso de SQL para principiantes - Introducción a SQL\", \"duracion\": \"15 minutos\"}, {\"nombre\": \"Sentencias SELECT\", \"descripcion\": \"Sentencias SELECT: curso de SQL para principiantes - Sentencias SELECT\", \"duracion\": \"15 minutos\"}, {\"nombre\": \"Sentencias WHERE\", \"descripcion\": \"Sentencias WHERE: curso de SQL para principiantes - Sentencias WHERE\", \"duracion\": \"15 minutos\"}, {\"nombre\": \"Sentencias ORDER BY\", \"descripcion\": \"Sentencias ORDER BY: curso de SQL para principiantes - Sentencias ORDER BY\", \"duracion\": \"15 minutos\"}, {\"nombre\": \"Sentencias GROUP BY\", \"descripcion\": \"Sentencias GROUP BY: curso de SQL para principiantes - Sentencias GROUP BY\", \"duracion\": \"15 minutos\"}], \"categoria\": \"programacion\", \"titulo\": \"SQL\", \"Dificultad\": \"principiante\", \"duracion\": \"1 hora\", \"numeroCapitulos\": 5}}\n\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "categoria programacion\nduracion 2 hora\ntitulo angular\nDificultad avanzado\nnumero de capitulos 6"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\"curso\": {\"nombre\": \"Angular\", \"descripcion\": \"Curso de Angular para desarrolladores avanzados\", \"capitulos\": [{\"nombre\": \"Componentes avanzados\", \"descripcion\": \"Componentes avanzados: curso de Angular para desarrolladores avanzados - Componentes avanzados\", \"duracion\": \"20 minutos\"}, {\"nombre\": \"Directivas personalizadas\", \"descripcion\": \"Directivas personalizadas: curso de Angular para desarrolladores avanzados - Directivas personalizadas\", \"duracion\": \"20 minutos\"}, {\"nombre\": \"Servicios y dependencias\", \"descripcion\": \"Servicios y dependencias: curso de Angular para desarrolladores avanzados - Servicios y dependencias\", \"duracion\": \"20 minutos\"}, {\"nombre\": \"Rutas avanzadas\", \"descripcion\": \"Rutas avanzadas: curso de Angular para desarrolladores avanzados - Rutas avanzadas\", \"duracion\": \"20 minutos\"}, {\"nombre\": \"Pruebas unitarias\", \"descripcion\": \"Pruebas unitarias: curso de Angular para desarrolladores avanzados - Pruebas unitarias\", \"duracion\": \"20 minutos\"}, {\"nombre\": \"Integración con backend\", \"descripcion\": \"Integración con backend: curso de Angular para desarrolladores avanzados - Integración con backend\", \"duracion\": \"20 minutos\"}], \"categoria\": \"programacion\", \"titulo\": \"Angular\", \"Dificultad\": \"avanzado\", \"duracion\": \"2 horas\", \"numeroCapitulos\": 6}}\n\n```"},
          ],
        },
      ],
    });
;