import React from 'react';
import { IconType } from 'react-icons';

interface SocialButtonProps {
    icon: IconType;
    onClick?: () => void;
}

const SocialButtons: React.FC<SocialButtonProps> = ({icon: Icon, onClick}) => {
  return (
    <button
        type='button'
        onClick={onClick}
        className='inline-flex w-full justify-center rounded-md bg-secondary-bg px-4 py-2 text-slate-200 shadow-sm ring-1 ring-inset ring-slate-500 hover:bg-secondary-bg/50 focus:outline-offset-0'
    ><Icon /></button>
  )
}

export default SocialButtons