import { useEffect, useMemo } from 'react';
import { SiLine } from 'react-icons/si';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChatRoom } from '@/components';
import { useFriendList, useCurrentUser, useMessageList } from '@/hooks';
import tempAvatar from '@/assets/images/user/defaultAvatar.png';

export function ComplexList({ searchTerm }: { searchTerm: string }) {
  const { getStatusColor } = useCurrentUser();
  const { friendList, fetchFriendList } = useFriendList();
  const { fetchMessageList, messageList } = useMessageList();

  useEffect(() => {
    fetchFriendList();
    fetchMessageList();
  }, []);

  const filteredFriends = useMemo(
    () => friendList.filter(friend => friend.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [friendList, searchTerm],
  );

  return (
    <Accordion
      type="single"
      collapsible
      className="yahoo-btn-cls"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {`好友列表（ ${filteredFriends.length} ) `}
        </AccordionTrigger>
        <AccordionContent>
          {filteredFriends.map(friend => (
            <section
              key={friend._id}
              className="relative flex cursor-pointer gap-5 px-3 py-2 hover:bg-gray-100"
            >
              <img
                src={friend.photo || tempAvatar}
                alt="friend avatar"
                className="size-14 flex-none rounded-full bg-slate-400 object-cover"
              />

              <div className="flex w-full flex-col gap-1 pr-16">
                <div className="flex flex-1 items-center justify-start gap-3">
                  <span
                    className={`inline-block size-2 rounded-full 
                      ${getStatusColor(friend?.onlineStatus)}`}
                  />
                  <p>{friend.name}</p>
                </div>
                <div className="flex-1" />
              </div>

              <p className="absolute  right-[22%] top-[45%] z-10 w-[200px]">
                {friend.messageBoard.startsWith('http') ? (
                  <a
                    href={friend.messageBoard}
                    target="_blank"
                    rel="noreferrer"
                    className=" text-blue-500 hover:underline"
                  >
                    {friend.messageBoard}
                  </a>
                ) : (
                  friend.messageBoard
                )}
              </p>

              <ChatRoom friend={friend} />

              <SiLine
                className="absolute right-10 top-1/2 size-4
              -translate-y-1/2 fill-lineColor"
                title="透過 Line 聊天室通訊"
              />

              {/* 未讀訊息 */}
              {messageList.filter(message => message.uuid === friend._id && !message.isRead).length > 0 && (
                <span className="absolute flex size-4 items-center justify-center rounded-full bg-red-500 text-center text-white">
                  {messageList.filter(message => message.uuid === friend._id && !message.isRead).length}
                </span>
              )}
            </section>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>邀約列表（0）</AccordionTrigger>
        <AccordionContent>
          <section className="flex flex-1 justify-between gap-6 p-3">
            <img
              src={tempAvatar}
              alt="user avatar"
              className="size-14 bg-slate-400 object-cover "
            />

            <div className="flex w-full flex-col justify-start gap-3">
              <div className="flex flex-1 items-center justify-start gap-3">
                <span className="inline-block size-4 rounded-full bg-black " />
                <p>好友名稱</p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="waiting-invite">等待對方接受邀請</p>
              </div>
            </div>
          </section>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
