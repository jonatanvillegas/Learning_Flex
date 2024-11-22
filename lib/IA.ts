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
  
  const modelInfo = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Escribe un resumen de 200 palabras sobre el tema del título. Proporciona una explicación clara y concisa en formato de texto plano, centrado en transmitir información básica, relevante y útil sobre el título. No añadas información adicional ni utilices formatos de enumeración o puntos",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  const generationConfigInfo = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
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

    export const chatSessionInfo = modelInfo.startChat({
      generationConfigInfo,
      history: [
        {
          role: "user",
          parts: [
            {text: "Directivas y Pipes"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "## Directivas y Pipes en Angular\n\nAngular, un framework de JavaScript para construir aplicaciones web, utiliza directivas y pipes para extender la funcionalidad del HTML y mejorar la presentación de datos.  Ambas son elementos clave para la creación de interfaces de usuario dinámicas y mantenibles.\n\n**Directivas:**\n\nLas directivas son instrucciones que le indican a Angular cómo modificar el DOM (Document Object Model).  Permiten añadir comportamiento a elementos, atributos, o incluso al componente en sí.  Existen tres tipos principales de directivas en Angular:\n\n* **Directivas componentes:**  Estas son las directivas más complejas, que encapsulan una vista (template) y lógica (clase).  Cada componente de Angular es, en esencia, una directiva componente. Se definen usando el decorador `@Component`.\n\n* **Directivas estructurales:** Estas directivas modifican la estructura del DOM al agregar, quitar o reemplazar elementos en función de una condición. Las directivas estructurales más comunes son:\n\n    * `*ngIf`:  Muestra o oculta un elemento según el valor de una expresión booleana.\n    * `*ngFor`: Itera sobre un array y crea una instancia del elemento hijo para cada elemento del array.\n    * `*ngSwitch`:  Permite mostrar diferentes bloques de HTML basados en el valor de una expresión.\n\n* **Directivas de atributos:** Estas directivas modifican la apariencia o el comportamiento de un elemento HTML existente, sin afectar su estructura.  Modifican los atributos de los elementos.  Ejemplos comunes incluyen:\n\n    * `ngClass`: Añade o elimina clases CSS a un elemento dependiendo de una expresión.\n    * `ngStyle`: Aplica estilos CSS a un elemento dependiendo de una expresión.\n    * `ngModel`:  Es una directiva clave para la vinculación de datos bidireccional entre el modelo de datos de la aplicación y la vista.\n\n\n**Pipes:**\n\nLos pipes transforman el valor de una expresión para la presentación en la plantilla.  Permiten formatear datos, filtrarlos o realizar otras transformaciones antes de que se muestren al usuario. Se utilizan dentro de la sintaxis de interpolación con el símbolo de pipe `|`.\n\nEjemplos comunes de pipes incluyen:\n\n* `date`: Formatea fechas.\n* `currency`: Formatea valores monetarios.\n* `uppercase`: Convierte una cadena a mayúsculas.\n* `lowercase`: Convierte una cadena a minúsculas.\n* `number`: Formatea números.\n* `json`:  Muestra un objeto JSON en formato legible.\n* `async`: Permite manejar observables de forma asíncrona.\n\n\n**Ejemplos:**\n\n**Directivas:**\n\n```html\n<!-- Directiva estructural *ngIf -->\n<div *ngIf=\"mostrarMensaje\">Este mensaje solo se muestra si mostrarMensaje es true</div>\n\n<!-- Directiva estructural *ngFor -->\n<ul>\n  <li *ngFor=\"let item of items\">{{item}}</li>\n</ul>\n\n<!-- Directiva de atributo ngClass -->\n<p [ngClass]=\"{'destacado': esImportante, 'error': hayError}\">Este párrafo cambia de estilo</p>\n\n<!-- Directiva de atributo ngStyle -->\n<h1 [ngStyle]=\"{'color': color}\">Título con color dinámico</h1>\n```\n\n**Pipes:**\n\n```html\n<!-- Pipe date -->\n<p>Hoy es: {{ fecha | date:'longDate' }}</p>\n\n<!-- Pipe currency -->\n<p>El precio es: {{ precio | currency:'USD':'symbol':'1.2-2' }}</p>\n\n<!-- Pipe uppercase -->\n<p>{{ nombre | uppercase }}</p>\n\n<!-- Pipe personalizado (ejemplo) -->\n<p>{{ nombre | miPipe }}</p>\n```\n\nEn el ejemplo de pipe personalizado, `miPipe` representaría un pipe creado por el desarrollador para una transformación específica.  Los pipes personalizados permiten reutilizar la lógica de formateo de datos en toda la aplicación.\n\n\n**Conclusión:**\n\nDirectivas y pipes son herramientas fundamentales en Angular para la creación de interfaces de usuario robustas y dinámicas.  Su uso correcto facilita la separación de la presentación de la lógica de la aplicación, mejorando la mantenibilidad y escalabilidad del código.  La combinación de ambos permite la creación de aplicaciones complejas con una sintaxis limpia y eficiente.\n"},
          ],
        },
      ],
    });