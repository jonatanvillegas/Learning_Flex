'use client';
import React, { useEffect, useState } from 'react';
import { FaHome, FaUser, FaBookmark, FaSignOutAlt } from 'react-icons/fa';
import sidebarItems from './SidebarItems/SidebarItems';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import axios from 'axios';
import { SignOutButton, useUser } from '@clerk/nextjs';
import { User } from '@prisma/client';
import SimpleSubscriptionCard from './CardPrices';
import { Price } from '@/types';
import { Check, CreditCard, Star, X } from 'lucide-react';
import { useModal } from '@/app/_store/modalActivo';

const Sidebar = () => {
    const [userAuth, setUserAuth] = useState<User | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [prices, setPrices] = useState<Price | null>(null)
    const [error, setError] = useState<string | null>(null);

    const { setModalActivo } = useModal();
    const { user } = useUser();
    const path = usePathname();

    const handleOpenModal = () => {
        setShowModal(true)

        setModalActivo(true)
    };
    const handleCloseModal = () => {
        setShowModal(false)

        setModalActivo(false)
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get<User>(`/api/userAuth?id=${user?.id}`);
                setUserAuth(data);
            } catch (err) {
                console.error(err);
                setError('Error al obtener el usuario.');
            }
        };

        if (user?.id) {
            fetchUser();
        }
    }, [user?.id]);

    const fetchSubscriptions = async () => {
        // Simulación de llamada a Stripe para obtener suscripciones
        try {
            const response = await axios.get('/api/precios');
            console.log(response.data.precios.data[0])
            setPrices(response.data.precios.data[0]);
        } catch (error) {
            console.error("Error obteniendo suscripciones:", error);
        }
    };

    console.log(userAuth?.creditos);

    return (
        <div className="fixed h-full md:w-64 p-5 shadow-md">
            <div>Mentorix</div>
            <hr className="my-5" />

            <ul>
                {sidebarItems.map((item, index) => (
                    <Link key={index} href={item.path}>
                        <div
                            className={`flex items-center gap-4 py-3 cursor-pointer hover:bg-slate-100 p-3 rounded-md ${item.path === path ? 'bg-slate-100 font-bold dark:text-primary' : ''
                                }`}
                        >
                            <item.icon />
                            <span>{item.nombre}</span>
                        </div>
                    </Link>

                ))}
                <div
                    className={`flex items-center gap-4 py-3 cursor-pointer hover:bg-slate-100 p-3 rounded-md `}
                >
                        <FaSignOutAlt />
                    <SignOutButton>
                        <span>Cerrar cesion</span>
                    </SignOutButton>
                </div>

            </ul>

            <div className="absolute bottom-10 w-[80%]">
                {userAuth?.creditos && userAuth.creditos > 0 ? (
                    <>
                        <Progress value={(userAuth.creditos / 5) * 100} />
                        <h2 className="text-gray-500 text-lg font-bold py-2">
                            {userAuth.creditos} de 5 creados
                        </h2>
                        <h3 className="text-xs">Crea más rutas que marquen la diferencia</h3>
                    </>
                ) : (

                    userAuth?.premium ? (
                        <button
                            onClick={() => {
                                console.log("Acción para usuarios Premium");
                            }}
                            className="mt-4 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-700"
                        >
                            <div className="flex items-center gap-2">
                                <Star />
                                Acceso Premium
                            </div>
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                handleOpenModal()
                                fetchSubscriptions();
                            }
                            }
                            className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-primary"
                        >
                            <div className='flex items-center gap-2'>
                                <CreditCard />
                                Planes
                            </div>
                        </button>
                    )

                )}
            </div>
            {showModal && prices && userAuth && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                        <SimpleSubscriptionCard prices={prices} userAuth={userAuth} />
                    </div>
                </div>
            )}
        </div>

    );

};

export default Sidebar;
