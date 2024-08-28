import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between items-center p-3 shadow-md'>
        <div>
            Learning FLex
        </div>
        <UserButton/>
    </div>
  )
}

export default Header