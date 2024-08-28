import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'


function SelectOprion() {
    return (
        <div className='px-10 md:px-20 lg:px-44'>
            <div className='grid grid-cols-2 gap-10'>
                <div>
                    <label htmlFor="">Nivel de Dificultad</label>
                    <Select>
                        <SelectTrigger className="swsw">
                            <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Principiante">Principiante</SelectItem>
                            <SelectItem value="Intermedio">Intermedio</SelectItem>
                            <SelectItem value="Avanzado">Avanzado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label htmlFor="">Duracion del Curso</label>
                    <Select>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1 Hora">1 hora</SelectItem>
                            <SelectItem value="2 Horas">2 horas</SelectItem>
                            <SelectItem value="Mas de 3 Horas">Mas de 3 horas</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label htmlFor="">Agregar Video</label>
                    <Select>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Si">Si</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label htmlFor="" className='text-sm'>N° de Capitulos</label>
                    <Input type='number'/>
                </div>
            </div>
        </div>
    )
}

export default SelectOprion
