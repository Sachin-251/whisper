"use client";
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps{
  id: string;
  register: UseFormRegister<FieldValues>;
  placeholder?: string;
  type?: string;
  required?: boolean;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({id, register, placeholder, type, required, errors}) => {
  return (
    <div className='relative w-full'>
      <input
        type={type}
        id={id}
        autoComplete={id}
        {...register(id, {required})}
        placeholder={placeholder}
        className='text-white font-light py-2 px-4 bg-secondary-bg w-full rounded-full focus:outline-none'
      />
    </div>
  )
}

export default MessageInput