'use client'
import { Curso } from '@/types'
import React from 'react'
import { SiLevelsdotfyi } from "react-icons/si";
import { IoMdTime } from "react-icons/io";
import { MdFormatListNumberedRtl } from "react-icons/md";
type props = {
    course: Curso
}
const DetailCourse = ({ course }: props) => {
    return (
        <div className='border p-6 rounded-xl shadow-md mt-3 justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='flex gap-4 justify-center items-center'>
                    <div>
                        <SiLevelsdotfyi className='text-primary' size={25}/>
                    </div>
                    <h2 className='text-xs text-gray-500 '>
                        Nivel:
                    </h2>
                    <h2 className='font-medium text-lg'>{course.Dificultad}</h2>
                </div>
                <div className='flex gap-4 justify-center items-center'>
                    <div>
                        <IoMdTime className='text-primary' size={25}/>
                    </div>
                    <h2 className='text-xs text-gray-500 '>
                        Duracion:
                    </h2>
                    <h2 className='font-medium text-lg'>{course.duracion}</h2>
                </div>
                <div className='flex gap-4 justify-center items-center'>
                    <div>
                        <MdFormatListNumberedRtl className='text-primary' size={25}/>
                    </div>
                    <h2 className='text-xs text-gray-500 '>
                        Numero de Cap:
                    </h2>
                    <h2 className='font-medium text-lg'>{course?.numCapitulos}</h2>
                </div>
            </div>
        </div>
    )
}

export default DetailCourse
