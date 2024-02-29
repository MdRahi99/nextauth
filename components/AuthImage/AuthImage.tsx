import Image from 'next/image';
import React from 'react';
import img from "../../assets/auth_image.jpg";

const AuthImage = () => {
    return (
        <div className='w-full h-96 lg:h-screen bg-[#4f2fed]'>
            <h1 className='text-white text-lg p-4'><span className='font-bold'>pronto</span>invoice</h1>
            <div className='flex items-center h-[40vh] lg:h-[90vh] justify-center'>
                <Image
                    className='rounded-full'
                    src={img}
                    alt='auth'
                    height='300'
                    width='300' />
            </div>
        </div>
    );
};

export default AuthImage;