'use client'
import React from 'react'
import { FaHome, FaUser, FaBookmark, FaSignOutAlt } from 'react-icons/fa';
import sidebarItems from './SidebarItems/SidebarItems';
import { IconType } from 'react-icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';



const Sidebar = () => {

    const path = usePathname()
    return (
        <div className='fixed h-full md:w-64 p-5 shadow-md'>
            <div>
                Mentorix
            </div>
            <hr className='my-5' />
            <ul>
                {sidebarItems.map((Item, index) => {
                    return (
                        <Link key={index} href={Item.path}>
                            <div className={`flex items-center gap-4 py-3 cursor-pointer  hover:bg-slate-100 p-3
                            rounded-md hover:font-bold ${Item.path == path && 'bg-slate-100 font-bold dark:text-primary'}`}>
                                <div className=''>
                                    {< Item.icon />}
                                </div>
                                <span>{Item.nombre}</span>
                            </div>
                        </Link>
                    );
                })}
            </ul>
            <div className='absolute bottom-10 w-[80%]'>
                <Progress value={50} />
                <h2 className='text-gray-500 text-lg font-bold py-2'>3 de 5 cursos creados</h2>
                <h3 className='text-xs'>Crean más cursos que marquen la diferencia</h3>
            </div>
        </div>
    )
}

export default Sidebar