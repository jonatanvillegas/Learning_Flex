import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-3 shadow-md mb-5'>
        <div>
            <Image src={'/MentorixImagotipo.svg'} width={130} height={130} alt='Mentorix'/>
        </div>
        <UserButton/>
    </div>
  )
}

export default Header