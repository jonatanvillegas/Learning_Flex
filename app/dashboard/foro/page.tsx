'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import React, { useState, FormEvent } from 'react'

// Definimos los tipos para los comentarios y temas del foro
type Comment = {
  id: number
  author: string
  content: string
  date: string
}

type Topic = {
  id: number
  title: string
  author: string
  date: string
  comments: Comment[]
}

// Datos estáticos para el foro
const forumData: Topic[] = [
  {
    id: 1,
    title: "Introducción a React",
    author: "María García",
    date: "2023-05-15",
    comments: [
      { id: 1, author: "Juan Pérez", content: "Excelente tema para principiantes.", date: "2023-05-16" },
      { id: 2, author: "Ana López", content: "¿Podrías recomendar algunos recursos adicionales?", date: "2023-05-17" }
    ]
  },
  {
    id: 2,
    title: "Mejores prácticas en CSS",
    author: "Carlos Rodríguez",
    date: "2023-05-18",
    comments: [
      { id: 1, author: "Laura Martínez", content: "Me encantaría ver ejemplos de layouts flexbox.", date: "2023-05-19" }
    ]
  }
]

const Foro = () => {
  const [topics, setTopics] = useState<Topic[]>(forumData)
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [newComment, setNewComment] = useState<string>("")

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic)
  }

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newComment.trim() === "") return

    const updatedTopics = topics.map(topic => {
      if (topic.id === selectedTopic?.id) {
        return {
          ...topic,
          comments: [
            ...topic.comments,
            {
              id: topic.comments.length + 1,
              author: "Usuario Actual",
              content: newComment,
              date: new Date().toISOString().split('T')[0]
            }
          ]
        }
      }
      return topic
    })

    setTopics(updatedTopics)
    setSelectedTopic(updatedTopics.find(t => t.id === selectedTopic?.id) || null)
    setNewComment("")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Foro de Discusión</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Temas</h2>
          {topics.map(topic => (
            <Card key={topic.id} className="mb-4 cursor-pointer hover:bg-gray-100" onClick={() => handleTopicClick(topic)}>
              <CardHeader>
                <CardTitle>{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Por {topic.author} - {topic.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="md:col-span-2">
          {selectedTopic ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{selectedTopic.title}</h2>
              <p className="text-gray-600 mb-4">Iniciado por {selectedTopic.author} el {selectedTopic.date}</p>
              <h3 className="text-xl font-semibold mb-2">Comentarios</h3>
              {selectedTopic.comments.map(comment => (
                <Card key={comment.id} className="mb-4">
                  <CardHeader>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author}`} />
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-lg">{comment.author}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{comment.content}</p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-gray-500">{comment.date}</p>
                  </CardFooter>
                </Card>
              ))}
              <form onSubmit={handleCommentSubmit} className="mt-6">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escribe tu comentario aquí..."
                  className="mb-2"
                />
                <Button type="submit">Añadir Comentario</Button>
              </form>
            </div>
          ) : (
            <p className="text-xl text-center text-gray-500">Selecciona un tema para ver los comentarios</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Foro