'use client'
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';

const Home = () => {

    const router = useRouter();

    const {user, logOut} = useAuth();
    const handleLogout = async() => {
        await logOut();
        router.push('/signin')
    };

    return (
        <div>
            <h1>{user?.displayName}</h1>
            <button onClick={()=>handleLogout()}>Log Out</button>
        </div>
    );
};

export default Home;