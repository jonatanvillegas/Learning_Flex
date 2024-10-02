"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import Image from 'next/image'
import Swal from 'sweetalert2'  // Importa SweetAlert

type Props = {
  userId: string
}

type Chapter = {
  id: number
  name: string
  description: string
  duration: string
}

type Course = {
  id: number
  name: string
  image: string
  category: string
  level: string
  duration: string
  numCapitulos: string
  Chapters: Chapter[]
}

export default function CourseList({ userId }: Props) {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [levelFilter, setLevelFilter] = useState<string>('all')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/cursos`, {
          params: { userId: userId },
        })
        setCourses(response.data)
        setFilteredCourses(response.data)
      } catch (err) {
        setError('Error al cargar los cursos')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [userId])

  useEffect(() => {
    const filtered = courses.filter(course => 
      (categoryFilter === 'all' || course.category === categoryFilter) &&
      (levelFilter === 'all' || course.level === levelFilter)
    )

    setFilteredCourses(filtered)
  }, [categoryFilter, levelFilter, courses])

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value)
  }

  const handleLevelChange = (value: string) => {
    setLevelFilter(value)
  }

  const handleDeleteCourse = async (courseId: number) => {
    // Mostrar un cuadro de confirmación
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Este curso se eliminará permanentemente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/cursos/${courseId}`)
        setCourses(courses.filter(course => course.id !== courseId))
        setFilteredCourses(filteredCourses.filter(course => course.id !== courseId))
        Swal.fire(
          'Eliminado!',
          'El curso ha sido eliminado.',
          'success'
        )
      } catch (err) {
        setError('Error al eliminar el curso')
      }
    }
  }

  if (loading) return <div className="text-center py-10">Cargando...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mis Cursos</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            <SelectItem value="programacion">Programacion</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={handleLevelChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Nivel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los niveles</SelectItem>
            <SelectItem value="Principiante">Principiante</SelectItem>
            <SelectItem value="intermedio">Intermedio</SelectItem>
            <SelectItem value="avanzado">Avanzado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="flex flex-col relative">
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 z-10"
              onClick={() => handleDeleteCourse(course.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <CardHeader className="p-0">
              <div className="relative w-full h-48">
                <Image
                  src={course.image || `/placeholder.svg?height=192&width=384`}
                  alt={course.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <CardTitle className="mt-4">{course.name}</CardTitle>
                <CardDescription className="mt-2">
                  <Badge variant="secondary" className="mr-2">{course.category}</Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Duración: {course.duration}</p>
              <p className="text-sm text-gray-600">Capítulos: {course.numCapitulos}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="chapters">
                  <AccordionTrigger>Ver capítulos</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {course.Chapters.map((chapter) => (
                        <li key={chapter.id} className="text-sm">
                          <p className="font-semibold">{chapter.name} ({chapter.duration})</p>
                          <p className="text-gray-600">{chapter.description}</p>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
