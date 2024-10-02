import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { ModeToggle } from './ModeToggle'

const Header = () => {
    return (
        <div className='flex justify-between p-3 shadow-lg border'>
            <div><Image src={'/MentorixImagotipo.svg'} width={100} height={100} alt='Mentorix' /></div>

            <div className='flex items-center gap-5'>
                <ModeToggle />
                <Button className='dark:text-white'>Iniciar Secion</Button>
            </div>
        </div>
    )
}

export default Header
