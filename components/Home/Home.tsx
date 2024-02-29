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

    return (
        <div>
            <h1>{user? user.displayName : 'No user Found'}</h1>
            {
                user ?
                    <button onClick={() => handleLogout()}>Log Out</button>
                    :
                    <Link href='/signin'>Sign In</Link>
            }
        </div>
    );
};

export default Home;