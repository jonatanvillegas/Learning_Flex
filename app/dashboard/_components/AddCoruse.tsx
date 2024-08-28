'use client'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const AddCoruse = () => {
  const { user } = useUser()
  return (
    <div className='flex justify-between items-center'>
      <div>
        <h2 className='text-2xl'>Hola,
          <span className='text-primary uppercase font-bold'>
            {user?.fullName}
          </span>
        </h2>
        <p>Crea un nuevo curso con ayuda de la IA</p>
      </div>
      <Link href="/create_course" >
        <Button>+  Crear con IA</Button>
      </Link>
    </div>
  )
}

export default AddCoruse