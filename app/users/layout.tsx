import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react'
import getUsers from '../actions/getUsers';
import { UserList } from '@/sections/user';

export default async function UsersLayout({
    children
}:{
    children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    <Sidebar>
        <div className='h-full'>
          <UserList items={users} />
          {children}
        </div>
    </Sidebar>
  )
}
