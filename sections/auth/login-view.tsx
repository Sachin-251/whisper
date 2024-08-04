"use client";
import Button from '@/components/Button';
import Input from '@/components/inputs/Input';
import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import SocialButtons from './social-btn-view';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = 'Login' | 'Register';

const LoginView = () => {
    const session = useSession();
    const [variant, setVariant] = useState<Variant>('Login');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(session?.status === 'authenticated'){
            router.push('/users');
        }
    },[session?.status, router]);

    const toggleVariant = useCallback(() => {
        if(variant === 'Login'){
            setVariant('Register');
        }else{
            setVariant('Login');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if(variant === 'Register'){
            // Axios Register
            axios.post('/api/register', data)
            .then(() => signIn('credentials', data))
            .catch(() => toast.error('Something went wrong'))
            .finally(() => setIsLoading(false))
        }

        if(variant === 'Login'){
            // NextAuth Signin
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if(callback?.error){
                    toast.error('Invalid Credentials');
                }

                if(callback?.ok){
                    router.push('/users');
                }
            })
            .finally(() => setIsLoading(false));
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        // NextAuth oAuth
        signIn(action, {redirect: false})
        .then((callback) => {
            if(callback?.error){
                toast.error('Invalid Credentials');
            }

            if(callback?.ok){
                router.push('/users');
            }
        })
        .finally(() => setIsLoading(false));
    }

  return (
    <>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image src='/images/logo.png' alt="logo" height={60} width={60} className="mx-auto w-auto" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
                {variant === 'Login' ? 'Sign in to your account' : 'Create your Whisper account'}
            </h2>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-secondary-bg px-6 py-8 shadow rounded-lg sm:px-10'>
                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'Register' && (
                        <Input id="name" label="Name" register={register} errors={errors} type='text' />
                    )}
                    <Input id="email" label="Email" register={register} errors={errors} type='email' disabled={isLoading} />
                    <Input id="password" label="Password" register={register} errors={errors} type='password' disabled={isLoading} />
                    <Button disabled={isLoading} fullWidth type="submit">
                        {variant === 'Login' ? 'Sign in' : 'Register'}
                    </Button>
                </form>

                <div className='mt-6'>
                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-slate-400' />
                        </div>

                        <div className='relative flex justify-center text-sm'>
                            <span className='bg-secondary-bg px-2 text-slate-400'>or continue with</span>
                        </div>
                    </div>

                    <div className='mt-6 flex gap-2'>
                        <SocialButtons icon={BsGithub} onClick={() => socialAction('github')} />
                        <SocialButtons icon={BsGoogle} onClick={() => socialAction('google')} />
                    </div>
                </div>

                <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-slate-400'>
                    <div>
                        {variant === 'Login' ? 'New to Whisper?' : 'Already have an account?'}
                    </div>
                    <div onClick={toggleVariant} className='underline cursor-pointer text-primary'>
                        {variant === 'Login' ? 'Create an account' : 'Log in'}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default LoginView