import Sidebar from '@/components/sidebar/Sidebar'
import { ConversationList } from '@/sections/conversations'
import React from 'react'
import getConversations from '../actions/getConversations'

export default async function layout({
    children
} : {
    children: React.ReactNode
}) {

    const conversations = await getConversations();

  return (
    <Sidebar>
        <div className='h-full'>
            <ConversationList initialItems={conversations} />
            {children}
        </div>
    </Sidebar>
  )
}
