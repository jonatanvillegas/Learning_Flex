import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { useUserInput } from '@/app/_store/Zustand';
import { User } from '@prisma/client';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';


function SelectOprion() {
    const {setUserCourseInput,userCourseInput}=useUserInput();

    const handlerInputChange = (name:string,value:string) => {
      setUserCourseInput(name,value)
    }

    const [userAuth, setUserAuth] = useState<User | null>(null);
    const { user } = useUser();

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const { data } = await axios.get<User>(`/api/userAuth?id=${user?.id}`);
          setUserAuth(data);
        } catch (err) {
          console.error(err);
        }
      };
  
      if (user?.id) {
        fetchUser();
      }
    }, [user?.id]);
    return (
        <div className='px-10 md:px-20 lg:px-44'>
            <div className='grid grid-cols-1 md:grid-cols-2  gap-10'>
                <div>
                    <label  htmlFor="">Nivel de Dificultad</label>
                    <Select onValueChange={(value)=> handlerInputChange("Dificultad",value)}
                        defaultValue={userCourseInput?.Dificultad}
                        >
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
                    <label htmlFor="">Duración:</label>
                    <Select onValueChange={(value)=> handlerInputChange("Duracion",value)}
                        defaultValue={userCourseInput?.Duracion}
                        >
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
                    <Select onValueChange={(value)=> handlerInputChange("AgregarVideo",value)}
                        defaultValue={userCourseInput?.AgregarVideo}
                        >
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
                    <label htmlFor="" className='text-sm'>N° de Capítulos</label>
                    <Input type='number' className='h-14 text-lg' 
                    onChange={(e)=>handlerInputChange("numCapitulos", e.target.value)}
                    defaultValue={userCourseInput?.numCapitulos}
                    max={userAuth?.premium && userAuth.premium ? 10 : 5}
                    />
                </div>
            </div>
        </div>
    )
}

export default SelectOprion
