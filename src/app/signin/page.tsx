'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';

const SignIn = () => {

    const { signIn, loading } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string>("");

    // Handle User Creation
    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await signIn(formData.email, formData.password);
            router.push('/')
        } catch (error: any) {
            console.error('Error signing in:', error);
            setError(
                error.message || "Failed to sign in. Please check your credentials and try again."
            );
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form onSubmit={handleSignIn}>
                <div className="mb-4">
                    <label>
                        Email
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label>
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </div>
                </div>

                {error && <div className="my-6 text-red-600">{error}</div>}

                <div className="mb-5">
                    <input
                        type="submit"
                        value="Sign In"
                    />
                </div>

                <div>
                    <p>
                        Don’t have any account?{' '}
                        <Link href="/signup">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignIn;