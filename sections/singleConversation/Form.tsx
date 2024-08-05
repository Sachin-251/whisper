"use client";
import useConversation from '@/app/hooks/useConversation'
import axios from 'axios';
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
    const { conversationId } = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', {shouldValidate: true});

        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    };

    const handleUpload = (result: any) => {
        axios.post('/api/messages',{
            image: result?.info?.secure_url,
            conversationId
        })
    }

  return (
    <div className='py-4 px-4 bg-primary-bg border-t border-slate-700 flex items-center gap-2 lg:gap-4 w-full'>
        <CldUploadButton options={{maxFiles: 1}} onUpload={handleUpload} uploadPreset='lga9j9dx'>
            <HiPhoto size={30} className='text-primary-btn cursor-pointer hover:text-sky-400 transition' />
        </CldUploadButton>
        <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-2 lg:gap-4 w-full'>
            <MessageInput id="message" register={register} errors={errors} required placeholder="Type your message..." />
            <button type='submit' className='rounded-full p-2 bg-primary-btn cursor-pointer hover:bg-sky-400 transition'>
                <HiPaperAirplane size={18} />
            </button>
        </form>
    </div>
  )
}

export default Form