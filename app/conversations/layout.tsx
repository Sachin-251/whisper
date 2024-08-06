import Sidebar from '@/components/sidebar/Sidebar'
import { ConversationList } from '@/sections/conversations'
import React from 'react'
import getConversations from '../actions/getConversations'
import getUsers from '../actions/getUsers'

export default async function layout({
    children
} : {
    children: React.ReactNode
}) {

    const conversations = await getConversations();
    const users = await getUsers();

  return (
    <Sidebar>
        <div className='h-full'>
            <ConversationList initialItems={conversations} users={users} />
            {children}
        </div>
    </Sidebar>
  )
}
