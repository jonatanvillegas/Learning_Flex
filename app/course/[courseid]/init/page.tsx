'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Import para obtener los parámetros
import axios from 'axios';
import { useViewCurso } from '@/app/_store/viewCurso';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuizGenerator from './_components/QuizGenerator';
import { BookOpen, FileDown, Info } from 'lucide-react';

export interface Chapter {
  id: number;
  courseId: number;
  name: string;
  description: string;
  duration: string;
  videoId: string;
}

type Params = {
  courseid: string;
}

export interface CourseIA {
  id: number;
  name: string;
  image: string;
  category: string;
  level: string;
  duration: string;
  numCapitulos: string;
  userId: string;
  createdAt: string; // Es mejor usar string para fechas si se va a guardar en localStorage
  Chapters: Chapter[];
}

const CoursePage = () => {
  const [courseData, setCourseData] = useState<Partial<CourseIA> | null>(null);
  const params: Params = useParams();
  const { Course, setCourse } = useViewCurso();  // Obtenemos la función para guardar en Zustand

  const [currentChapter, setCurrentChapter] = useState("Introducción al Curso")
  const [youtubeVideoId, setYoutubeVideoId] = useState("dQw4w9WgXcQ");  // Estado para el video ID
  const [courseInfo, setCourseInfo] = useState("");

  const generateCourseInfo = () => {
    setCourseInfo(`Información relevante para el capítulo "${currentChapter}":

Este capítulo cubre los conceptos fundamentales necesarios para comprender el resto del curso. Se abordan temas clave como:

1. Introducción a los principios básicos
2. Metodologías y enfoques principales
3. Herramientas y tecnologías utilizadas en el campo
4. Casos de estudio y ejemplos prácticos
5. Desafíos comunes y cómo superarlos

Se recomienda tomar notas detalladas, participar activamente en las discusiones y completar todos los ejercicios propuestos para maximizar el aprendizaje. Este capítulo sienta las bases para el contenido más avanzado que se cubrirá en las secciones posteriores del curso.`)
  }

  useEffect(() => {
   // Si ya tenemos el curso guardado en Zustand, no hacemos la solicitud
   if (Course.id === Number(params.courseid)) {
    setCourseData(Course);  // Utilizamos el curso guardado en Zustand
  } else if (params.courseid) {
    const fetchCourseData = async () => {
      try {
        const { data } = await axios.get(`/api/cursos/${params.courseid}`);
        setCourseData(data);  // Almacenamos en el estado local
        setCourse(data);  // Guardamos en Zustand
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

      fetchCourseData();
    }
  }, [params.courseid, setCourse]);  // Añadimos `setCourse` a las dependencias

  const downloadChapter = () => {
    alert(`Descargando capítulo: ${currentChapter}`)
    // Aquí iría la lógica real para descargar el capítulo
  }

  // Función para cambiar de capítulo y actualizar el video
  const handleChapterChange = (chapter: Chapter) => {
    setCurrentChapter(chapter.name);
    setYoutubeVideoId(chapter.videoId);  // Actualizamos el videoId cuando se selecciona un capítulo
  }

  console.log(courseData);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
      <aside className="lg:w-1/4 mb-6 lg:mb-0">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BookOpen className="mr-2" />
          ruta de Aprendizaje
        </h2>
        <div className="space-y-2">
          {courseData && courseData.Chapters ? (
            courseData.Chapters.map((chapter, index) => (
              <Card
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleChapterChange(chapter)}  // Usamos la función para cambiar de capítulo
              >
                <h3 className="font-medium">{chapter.name}</h3>
                <p className="text-sm text-gray-500">{chapter.description}</p>
              </Card>
            ))
          ) : (
            <p>No hay capítulos disponibles</p>  // Mensaje si courseData o Chapters no existen
          )}
        </div>
      </aside>

      <div className="lg:w-1/2">
        <div className="aspect-video bg-gray-800 mb-4">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}  // Usamos el estado dinámico del videoId
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <h1 className="text-3xl font-bold mb-6">{currentChapter}</h1>
        <div className="flex justify-between items-center mb-6">
          <Button onClick={generateCourseInfo} className="flex items-center text-lg py-2 px-4">
            <Info className="mr-2 h-5 w-5" />
            Generar Información textual
          </Button>
          <Button onClick={downloadChapter} className="flex items-center text-lg py-2 px-4">
            <FileDown className="mr-2 h-5 w-5" />
            Descargar Informacion
          </Button>
        </div>
        {courseInfo && (
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Información del Curso</h2>
            <p className="text-lg leading-relaxed whitespace-pre-line">{courseInfo}</p>
          </Card>
        )}
      </div>

      <div className="lg:w-1/4">
        <h2 className="text-xl font-semibold mb-4">Seccion de Preguntas</h2>
        <QuizGenerator chapterTitle={currentChapter} />
      </div>
    </div>
  );
};

export default CoursePage;
