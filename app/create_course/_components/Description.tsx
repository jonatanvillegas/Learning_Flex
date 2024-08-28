import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function Description() {
    return (
        <div className='mx-20 lg:mx-44'>
            <div className='mt-5'>
                <label>
                    Escribre tu titulo y espera a que la IA te genere tu Curso
                </label>
                <Input placeholder='Titulo' />
            </div>
            <div className='mt-5'>
                <label htmlFor="">Dime mas sobre el curso que quieras que cree</label>
                <Textarea placeholder='Descripcion del Curso'/>
            </div>
        </div>
    )
}

export default Description
