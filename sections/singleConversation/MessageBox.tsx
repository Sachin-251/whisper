import { FullMessageType } from '@/app/types';
import Avatar from '@/components/Avatar';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'

interface MessageBoxProps{
  isLast?: boolean;
  data: FullMessageType;
}

const MessageBox: React.FC<MessageBoxProps> = ({isLast, data}) => {
  const session = useSession();

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data?.seen || []).filter((user) => user.email !== data?.sender?.email).map((user) => user.name).join(', ');

  const container = clsx(
    "flex gap-3 p-4",
    isOwn && "justify-end"
  );

  const avatar = clsx(isOwn && "order-2");

  const body = clsx(
    "flex flex-col gap-2",
    isOwn && "items-end"
  );

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-primary-btn rounded-l-lg rounded-b-lg" : "rounded-r-lg rounded-b-lg bg-secondary-bg",
    data?.image ? "p-0" : "py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data?.sender} />
      </div>

      <div className={body}>
        <div className='flex items-center gap-1'>
          <div className='text-sm text-slate-300'>
            {data?.sender?.name}
          </div>

          <div className='text-xs text-slate-500'>
            {format(new Date(data?.createdAt), 'p')}
          </div>
        </div>

        <div className={message}>
          {data?.image ? (
            <Image alt='img' width={288} height={288} src={data?.image} className='object-cover cursor-pointer hover:scale-105 transition translate' />
          ) : (
            <div>{data?.body}</div>
          )}
        </div>

        {isLast && isOwn && seenList.length > 0 && (
          <div className='text-[14px] font-light text-slate-500'>
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageBox