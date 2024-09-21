import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <div className='flex justify-between p-3 shadow-lg border'>
            <div><Image src={'/MentorixImagotipo.svg'} width={100} height={100} alt='Mentorix'/></div>
            <Button>Iniciar Secion</Button>
        </div>
    )
}

export default Header
