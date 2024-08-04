"use client";
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'

interface MobileItemProps{
    href: string;
    icon: any;
    active?: boolean
    onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({href, icon: Icon, active, onClick}) => {

    const handleClick = () => {
        if(onClick){
            return onClick();
        }
    }

  return (
    <Link href={href} onClick={handleClick} className={clsx(
        `group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-slate-400 hover:text-slate-200 hover:bg-secondary-bg/20`,
        active && "bg-secondary-bg/20 text-slate-200"
    )}>
        <Icon className="h-6 w-6 shrink-0" />
    </Link>
  )
}

export default MobileItem