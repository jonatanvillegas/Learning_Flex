'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Import para obtener los parámetros
import axios from 'axios';
import { useViewCurso } from '@/app/_store/viewCurso';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuizGenerator from './_components/QuizGenerator';
import { BookOpen, FileDown, Info } from 'lucide-react';
import { jsPDF } from 'jspdf';
import Header from '@/app/dashboard/_components/Header';

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
  const { Course, setCourse } = useViewCurso();
  const [activo, setActivo] = useState(false)
  const [descargaA, setdescargaA] = useState(false)

  const [currentChapter, setCurrentChapter] = useState("")
  const [youtubeVideoId, setYoutubeVideoId] = useState("");  // Estado para el video ID
  const [courseInfo, setCourseInfo] = useState("");

  const generateCourseInfo = async () => {
    try {
      // const respuesta = await fetch('/api/getinfo', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({currentChapter}),
      // });
      // console.log(respuesta.json())
      const respuesta = await axios.post("/api/getinfo", { currentChapter })
      setCourseInfo(respuesta.data.info)
      setActivo(true)
      console.log(respuesta.data.info)
    } catch (error) {

    }
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
    setdescargaA(true)
    alert(`Descargando capítulo: ${currentChapter}`);
    const doc = new jsPDF();

    // Dividir el texto en líneas para que no se desborde
    const margin = 10;
    const pageWidth = doc.internal.pageSize.width;
    const text = courseInfo; // Este es el texto a poner en el PDF

    // Ajustar el texto a un ancho de página específico
    const maxLineWidth = pageWidth - 2 * margin; // Dejamos margen en ambos lados
    const lines = doc.splitTextToSize(text, maxLineWidth);

    // Agregar las líneas al PDF
    doc.text(lines, margin, margin);

    // Guardar el PDF
    doc.save('texto_documento.pdf');
  };

  // Función para cambiar de capítulo y actualizar el video
  const handleChapterChange = (chapter: Chapter) => {
    setActivo(false)
    setCourseInfo("")
    setdescargaA(false)
    setCurrentChapter(chapter?.name);
    setYoutubeVideoId(chapter.videoId);  // Actualizamos el videoId cuando se selecciona un capítulo
  }

  console.log(courseData);

  return (
    <>
        <Header />
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
            <Button onClick={generateCourseInfo} className="flex items-center text-lg py-2 px-4" disabled={activo}>
              <Info className="mr-2 h-5 w-5" />
              Generar Información textual
            </Button>
            <Button onClick={downloadChapter} className="flex items-center text-lg py-2 px-4" disabled={descargaA}>
              <FileDown className="mr-2 h-5 w-5" />
              Descargar Informacion
            </Button>
          </div>
          {courseInfo && (
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Mas Informacion</h2>
              <p className="text-lg leading-relaxed whitespace-pre-line">{courseInfo}</p>
            </Card>
          )}
        </div>

        <div className="lg:w-1/4">
          <h2 className="text-xl font-semibold mb-4">Seccion de Preguntas</h2>
          <QuizGenerator chapterTitle={currentChapter} />
        </div>
      </div>
    </>
  );
};

export default CoursePage;
