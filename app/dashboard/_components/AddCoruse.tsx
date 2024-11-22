'use client'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { User } from '@prisma/client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const AddCoruse = () => {
  const { user } = useUser();
  const [userAuth, setUserAuth] = useState<User | null>(null);

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
    <div className='flex justify-between items-center'>
      <div>
        <h2 className='text-2xl'>Hola,
          <span className='text-primary uppercase font-bold'>
            {user?.fullName}
          </span>
        </h2>
        <p>Diseña tu proximo camino con la potencia de la <span className='text-primary'>IA</span> a tu lado</p>
      </div>
      {userAuth?.premium && userAuth.premium ? (
        <Link href="/create_course" >
          <Button className='dark:text-white'>+  Crear con IA</Button>
        </Link>
      ) : (

        userAuth?.creditos && userAuth.creditos > 0 ? (
          <Link href="/create_course" >
            <Button className='dark:text-white'>+  Crear con IA</Button>
          </Link>
        ) : (
          <Link href="/create_course" >
            <Button className='dark:text-white' disabled>+  Crear con IA</Button>
          </Link>
        )

      )}
    </div>
  )
}

export default AddCoruse