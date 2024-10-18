import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";

function QuizGenerator({ chapterTitle }: { chapterTitle: string }) {
    const [questions, setQuestions] = useState<Array<{ question: string; options: string[]; correctAnswer: number }>>([])
    const [userAnswers, setUserAnswers] = useState<number[]>([])
    const [showResults, setShowResults] = useState(false)
  
    const generateQuestions = () => {
      const newQuestions = [
        {
          question: `¿Cuál es el tema principal de "${chapterTitle}"?`,
          options: ["Opción A", "Opción B", "Opción C", "Opción D"],
          correctAnswer: Math.floor(Math.random() * 4)
        },
        {
          question: `En el contexto de "${chapterTitle}", ¿qué afirmación es correcta?`,
          options: ["Afirmación 1", "Afirmación 2", "Afirmación 3", "Afirmación 4"],
          correctAnswer: Math.floor(Math.random() * 4)
        },
        {
          question: `¿Qué concepto clave se discute en "${chapterTitle}"?`,
          options: ["Concepto X", "Concepto Y", "Concepto Z", "Concepto W"],
          correctAnswer: Math.floor(Math.random() * 4)
        }
      ]
      setQuestions(newQuestions)
      setUserAnswers(new Array(newQuestions.length).fill(-1))
      setShowResults(false)
    }
  
    useEffect(() => {
      generateQuestions()
    }, [chapterTitle])
  
    const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
      setUserAnswers(prev => {
        const newAnswers = [...prev]
        newAnswers[questionIndex] = answerIndex
        return newAnswers
      })
    }
  
    const reviewAnswers = () => {
      setShowResults(true)
    }
  
    return (
      <div>
        <Button onClick={showResults ? generateQuestions : reviewAnswers} className="mb-4">
          {showResults ? "Generar Nuevas Preguntas" : "Revisar Respuestas"}
        </Button>
        {questions.map((q, index) => (
          <Card key={index} className="mb-4 p-4">
            <h3 className="font-semibold mb-2">{q.question}</h3>
            <RadioGroup value={userAnswers[index].toString()} onValueChange={(value) => handleAnswerChange(index, parseInt(value))}>
              {q.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={optionIndex.toString()} 
                    id={`question-${index}-option-${optionIndex}`}
                    className={showResults ? 
                      (optionIndex === q.correctAnswer ? "text-green-500" : 
                      (userAnswers[index] === optionIndex ? "text-red-500" : "")) : ""}
                  />
                  <Label 
                    htmlFor={`question-${index}-option-${optionIndex}`}
                    className={showResults ? 
                      (optionIndex === q.correctAnswer ? "text-green-500" : 
                      (userAnswers[index] === optionIndex ? "text-red-500" : "")) : ""}
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {showResults && (
              <p className={userAnswers[index] === q.correctAnswer ? "text-green-500 mt-2" : "text-red-500 mt-2"}>
                {userAnswers[index] === q.correctAnswer ? "¡Correcto!" : "Incorrecto. La respuesta correcta es: " + q.options[q.correctAnswer]}
              </p>
            )}
          </Card>
        ))}
      </div>
    )
  }

  export default QuizGenerator