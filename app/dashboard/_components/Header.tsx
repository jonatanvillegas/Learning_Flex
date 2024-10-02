import { ModeToggle } from '@/app/_components/ModeToggle'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-3 shadow-md mb-5'>
      <div>
        <Image src={'/MentorixImagotipo.svg'} width={130} height={130} alt='Mentorix' />
      </div>
      <div className='flex items-center gap-5'>
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  )
}

export default Header