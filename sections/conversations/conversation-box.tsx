"use client";
import useOtherUser from '@/app/hooks/useOtherUser';
import { FullConversationType } from '@/app/types';
import Avatar from '@/components/Avatar';
import AvatarGroup from '@/components/AvatarGroup';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'

interface ConversationBoxProps{
    data: FullConversationType;
    selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({data, selected}) => {

    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    },[data?.id, router]);

    const lastMessage = useMemo(() => {
        const messages = data?.messages || [];

        return messages[messages.length - 1];
    },[data?.messages]);

    const userEmail = useMemo(() => {
        return session?.data?.user?.email;
    },[session?.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if(!lastMessage){
            return false;
        }

        const seenArray = lastMessage.seen || [];

        if(!userEmail){
            return false;
        }

        return seenArray.filter((user) => user.email === userEmail).length !== 0;
    },[lastMessage, userEmail]);

    const lastMessageText = useMemo(() => {
        if(lastMessage?.image){
            return 'Sent an image'
        }

        if(lastMessage?.body){
            return lastMessage?.body;
        }

        return 'Started a conversation'
    },[lastMessage]);

  return (
    <div onClick={handleClick} className={clsx(
        `w-full relative flex items-center space-x-3 p-3 hover:bg-secondary-bg/40 rounded-lg transition cursor-pointer`,
        selected ? 'bg-secondary-bg/40' : 'bg-primary-bg'
    )}>
        {data?.isGroup ? (
            <AvatarGroup users={data.users} />
        ) : (
            <Avatar user={otherUser} />
        )}
        
        <div className='min-w-0 flex-1'>
            <div className='focus:outline-none'>
                <div className='flex justify-between items-center mb-1'>
                    <p className='text-sm font-medium text-slate-300'>{data?.name || otherUser?.name}</p>

                    {lastMessage?.createdAt && (
                        <p className='text-xs text-slate-400 font-light'>
                            {format(new Date(lastMessage.createdAt), 'p')}
                        </p>
                    )}

                </div>

                <p className={clsx(
                    `truncate text-sm`,
                    hasSeen ? 'text-slate-400' : 'text-slate-100 font-medium'
                )}>
                    {lastMessageText}
                </p>
                
            </div>
        </div>
    </div>
  )
}

export default ConversationBox