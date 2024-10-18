'use client'
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { FaChartLine, FaCogs, FaChartPie } from 'react-icons/fa'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import React from 'react'

function Hero() {
    const { user } = useUser();
    // Redirigir a diferentes vistas del dashboard si el usuario está autenticado
    if (user?.id) {
        // Verifica si ya estás en la ruta de dashboard para evitar redirecciones en bucle
        if (window.location.pathname !== "/dashboard") {
            redirect("/dashboard");
        }
    }
    const timelineSteps = [
        {
            title: "Regístrate",
            description: "Crea tu cuenta en nuestra plataforma de forma rápida y sencilla.",
            bgColor: "bg-blue-100",
            borderColor: "border-blue-400"
        },
        {
            title: "Piensa en el titulo de tu curso",
            description: "Ingresa el titulo especificando tu categoria.",
            bgColor: "bg-green-100",
            borderColor: "border-green-400"
        },
        {
            title: "Completa nuestros formularios",
            description: "Ingresa la informacion para que nuestra IA pueda ayudarte.",
            bgColor: "bg-yellow-100",
            borderColor: "border-yellow-400"
        },
        {
            title: "Visualiza la estructura que genera la IA",
            description: "Informacion detalla del curso generado.",
            bgColor: "bg-purple-100",
            borderColor: "border-purple-400"
        },
        {
            title: "Guarda el curso",
            description: "Da inicio para guardar el curso",
            bgColor: "bg-pink-100",
            borderColor: "border-pink-400"
        },
        {
            title: "Visualiza el curso desde el home",
            description: "Preciona el uno de los cursos creados para visualizar su contenido.",
            bgColor: "bg-red-100",
            borderColor: "border-red-400"
        }
    ];
    const team = [
        {
            name: "Ana García",
            role: "CEO & Fundadora",
            bio: "Con más de 10 años de experiencia en UX y análisis de datos.",
            image: "https://via.placeholder.com/500"
        },
        {
            name: "Carlos Rodríguez",
            role: "CTO",
            bio: "Experto en desarrollo de software y arquitectura de sistemas.",
            image: "https://via.placeholder.com/500"
        },
        {
            name: "Laura Martínez",
            role: "Diseñadora UX",
            bio: "Apasionada por crear experiencias de usuario intuitivas y atractivas.",
            image: "https://via.placeholder.com/500"
        }
    ]

    return (
        <>
            <section className="bg-gray border-b-2">
                <div className="mx-auto max-w-screen-md px-4 py-52 lg:flex lg:h-full lg:items-center">
                    <div className="mx-auto max-w-xl text-center">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                            Ai Generadora de
                            <strong className="font-extrabold text-primary sm:block"> Cursos </strong>
                        </h1>

                        <p className="mt-4 sm:text-xl/relaxed">
                            Solo Imagina el titulo, has clic y desbloquea el curso que cambiara tuvida al 100%
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a
                                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-950 focus:outline-none focus:ring active:bg-sky-900 sm:w-auto"
                                href="/sign-in"
                            >
                                Empezar
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 bg-gray border-b-2">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12 dark:text-white">
                        Cómo Funciona
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
                            <div className="flex justify-center mb-6">
                                <FaChartLine className="text-4xl text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-center mb-4 dark:text-primary">1. Análisis</h3>
                            <p className="text-gray-600 text-center">
                                Analizamos el flujo de usuarios en tu plataforma para identificar áreas de mejora.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
                            <div className="flex justify-center mb-6">
                                <FaCogs className="text-4xl text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-center mb-4 dark:text-primary">2. Optimización</h3>
                            <p className="text-gray-600 text-center">
                                Implementamos cambios estratégicos para mejorar la experiencia del usuario.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
                            <div className="flex justify-center mb-6">
                                <FaChartPie className="text-4xl text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-center mb-4 dark:text-primary">3. Resultados</h3>
                            <p className="text-gray-600 text-center">
                                Medimos el impacto de los cambios y ajustamos para maximizar las conversiones.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-gray border-b-2">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Cómo usar nuestra aplicación</h2>
                    <div className="relative">
                        {/* Línea central */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 bg- w-1 h-full bg-primary"></div>

                        {timelineSteps.map((step, index) => (
                            <div
                                key={index}
                                className={`mb-16 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''
                                    }`}
                            >
                                <div className="w-5/12"></div>
                                <div className="z-20">
                                    {/* Icono de paso completado */}
                                    <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full shadow-lg">
                                        <CheckCircle className="text-white" />
                                    </div>
                                </div>
                                <div className={`w-5/12 p-6 rounded shadow-md relative border-l-4 ${step.bgColor} ${step.borderColor}`}>
                                    {/* Línea conectando los pasos */}
                                    <div
                                        className={`absolute top-8 ${index % 2 === 0 ? 'right-full' : 'left-full'
                                            } w-8 h-1 bg-primary`}
                                    ></div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-800">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-20 bg-gray border-b-2">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-white">Nuestro Equipo</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 text-center"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-40 h-40 object-cover rounded-full mx-auto mb-6"
                                />
                                <h3 className="text-2xl font-semibold mb-2 text-gray-900">{member.name}</h3>
                                <p className="text-primary font-medium mb-4">{member.role}</p>
                                <p className="text-gray-600">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Síguenos en redes sociales</h2>
                    <div className="flex justify-center space-x-6 mb-6">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500"
                        >
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400"
                        >
                            <Twitter className="w-6 h-6" />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pink-500"
                        >
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-700"
                        >
                            <Linkedin className="w-6 h-6" />
                        </a>
                    </div>
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Mentorix. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Hero
