import { Button } from '@/components/ui/button'
import React from 'react'

const Header = () => {
    return (
        <div className='flex justify-between p-3 shadow-lg border'>
            <div>Learnin Flex</div>
            <Button>Iniciar Secion</Button>
        </div>
    )
}

export default Header
