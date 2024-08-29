'use client'
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

function Hero() {
  const {user} = useUser()
    
    return (
        <section className="bg-gray">
            <div className="mx-auto max-w-screen-md px-4 py-32 lg:flex lg:h-full lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Ai Generadora de 
                        <strong className="font-extrabold text-primary sm:block"> Cursos  </strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                       contan solo proporcionar un titulo tendras un curso 100% genial
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-950 focus:outline-none focus:ring active:bg-sky-900 sm:w-auto"
                            href="/sign-in"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
