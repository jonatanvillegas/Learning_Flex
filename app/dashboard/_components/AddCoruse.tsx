'use client'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const AddCoruse = () => {
  const { user } = useUser();
  
  return (
    <div className='flex justify-between items-center'>
      <div>
        <h2 className='text-2xl'>Hola,
          <span className='text-primary uppercase font-bold'>
            {user?.fullName}
          </span>
        </h2>
        <p>Diseña tu proximo curso con la potencia de la <span className='text-primary'>IA</span> a tu lado</p>
      </div>
      <Link href="/create_course" >
        <Button className='dark:text-white'>+  Crear con IA</Button>
      </Link>
    </div>
  )
}

export default AddCoruse