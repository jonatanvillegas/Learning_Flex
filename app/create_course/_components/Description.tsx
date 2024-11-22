import { useUserInput } from '@/app/_store/Zustand'
import { Input } from '@/components/ui/input'
import React from 'react'



function Description() {
    const {setUserCourseInput,userCourseInput}=useUserInput();

    const handlerInputChange = (name:string,value:string) => {
      setUserCourseInput(name,value)
    }
    return (
        <div className='mx-20 text-sm  lg:mx-44'>
            <div className='mt-5'>
                <label>
                    Escribre tu titulo y espera a que la IA te genere tu ruta de aprendizaje
                </label>
                <Input className='mt-4' placeholder='Titulo' 
                    onChange={(e)=>handlerInputChange("Titulo",e.target.value)}
                    defaultValue={userCourseInput?.Titulo}
                />
            </div>
        </div>
    )
}

export default Description
