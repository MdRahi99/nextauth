'use client'
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Home = () => {

    const router = useRouter();

    const { user, logOut } = useAuth();
    
    const handleLogout = async () => {
        await logOut();
        router.push('/')
    };

    const app_name = 'Pronto Invoice'

    return (
        <div className='flex flex-col gap-3'>
            <h1 className='text-xl font-bold'>{`Hello ${user ? user.displayName : ''}, Welcome to ${app_name}`}</h1>
            <div>
                {
                user ?
                    <button onClick={() => handleLogout()}>Log Out</button>
                    :
                    <Link href='/signin'>Sign In</Link>
            }
            </div>
        </div>
    );
};

export default Home;