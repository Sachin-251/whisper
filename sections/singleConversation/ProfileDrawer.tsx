"use client"
import useOtherUser from '@/app/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import { format } from 'date-fns';
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useMemo, useState } from 'react';
import { IoClose, IoTrash } from "react-icons/io5";
import Avatar from '@/components/Avatar';
import ConfirmModal from './ConfirmModal';
import AvatarGroup from '@/components/AvatarGroup';
import useActiveList from '@/app/hooks/useActiveList';


interface ProfileDrawerProps{
  data: Conversation & {
    users: User[]
  }
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({data, isOpen, onClose}) => {
  const otherUser = useOtherUser(data);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser?.createdAt), 'PP');
  },[otherUser?.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return isActive ? 'Online' : 'Offline';
  }, [data, isActive]);

  return (
    <>
    <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
    />
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="
              fixed
              inset-0
              bg-black
              bg-opacity-40
            "
          />
        </Transition.Child>

        <div
            className="
              fixed
              inset-0
              overflow-hidden
            "
          >
            <div
              className="
                absolute
                inset-0
                overflow-hidden
              "
            >
              <div className="
                pointer-events-none
                fixed
                inset-y-0
                right-0
                flex
                max-w-full
                pl-10
              ">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel
                    className="
                      pointer-events-auto
                      w-screen
                      max-w-md
                    "
                  >
                    <div
                      className="
                        flex
                        h-full
                        flex-col
                        overflow-y-scroll
                        bg-primary-bg
                        py-6
                        shadow-xl
                      "
                    >
                      <div className="px-4 sm:px-6">
                        <div 
                          className="
                            flex
                            items-start
                            justify-end
                          "
                        >
                          <div className="
                            ml-3
                            flex
                            h-7
                            items-center
                          ">
                            <button
                              onClick={onClose}
                              type="button"
                              className="
                                rounded-md
                                bg-primary-bg
                                text-gray-300
                                hover:text-gray-400
                                focus:outline-none
                                focus:ring-2
                                focus:ring-sky-500
                                focus:ring-offset-2
                              "
                            >
                              <span className="sr-only">Close panel</span>
                              <IoClose size={30} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="
                        relative mt-6
                        flex-1 px-4
                        sm:px-6
                      ">
                        <div className="
                          flex flex-col items-center
                        ">
                          <div className="mb-2">
                            {data.isGroup ? (
                              <>
                              <AvatarGroup users={data.users} />
                              <p>Group</p>
                              </>
                            ) : (
                              <Avatar user={otherUser} />
                            )}
                          </div>
                          <div>
                            {title}
                          </div>
                          <div className="
                            text-sm text-slate-400
                          ">
                            {statusText}
                          </div>
                          <div className="flex gap-10 my-8">
                            <div
                              onClick={() => setConfirmOpen(true)}
                              className="
                                flex
                                flex-col
                                gap-3
                                items-center
                                cursor-pointer
                                hover:opacity-75
                              "
                            >
                              <div
                                className="
                                  w-10
                                  h-10
                                  bg-slate-700
                                  rounded-full
                                  flex
                                  items-center
                                  justify-center
                                  text-red-500
                                "
                              >
                                <IoTrash size={20} />
                              </div>
                              <div
                                className="
                                  text-sm
                                  font-light
                                  text-red-500
                                "
                              >
                                Delete
                              </div>
                            </div>
                          </div>
                          <div
                            className="
                              w-full
                              pb-5
                              pt-5
                              sm:px-0
                              sm:pt-0
                            "
                          >
                            <dl
                              className="
                                space-y-8
                                px-4
                                sm:space-y-6
                                sm:px-6
                              "
                            >
                              {data.isGroup && (
                                <div>
                                  <dt
                                    className="
                                      text-sm
                                      font-medium
                                      text-slate-200
                                      sm:w-40
                                      sm:flex-shrink-0
                                    "
                                  >
                                    Emails
                                  </dt>
                                  <dd
                                    className="
                                      mt-1
                                      text-sm
                                      text-slate-400
                                      sm:col-span-2
                                    "
                                  >
                                    {data.users.map((user) => user.email).join(', ')}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <div>
                                  <dt
                                    className="
                                      text-sm
                                      font-medium
                                      text-slate-200
                                      sm:w-40
                                      sm:flex-shrink-0
                                    "
                                  >
                                    Email
                                  </dt>
                                  <dd
                                    className="
                                      mt-1
                                      text-sm
                                      text-slate-400
                                      sm:col-span-2
                                    "
                                  >
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr />
                                  <div>
                                    <dt
                                      className="
                                        text-sm
                                        font-medium
                                        text-slate-200
                                        sm:w-40
                                        sm:flex-shrink-0
                                      "
                                    >
                                      Joined
                                    </dt>
                                    <dd
                                      className="
                                        mt-1
                                        text-sm
                                        text-slate-400
                                        sm:col-span-2
                                      "
                                    >
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
      </Dialog>
    </Transition.Root>
    </>
  )
}

export default ProfileDrawer