import { useEffect, useMemo } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useFriendList, useCurrentUser } from '@/hooks';
import tempAvatar from '@/assets/images/user/defaultAvatar.png';

export function ComplexList({ searchTerm }: {searchTerm: string}) {
  const { getStatusColor } = useCurrentUser();
  const { friendList, updateFriendList } = useFriendList();

  useEffect(() => {
    updateFriendList();
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
              className="flex gap-5 py-2 px-3 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={friend.photo || tempAvatar}
                alt="friend avatar"
                className="size-14 bg-slate-400 object-cover rounded-lg flex-none"
              />

              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-3 justify-start flex-1">
                  <span
                    className={`inline-block size-2 rounded-full ${getStatusColor(friend?.onlineStatus)}`}
                  />
                  <p>{friend.name}</p>
                </div>

                <div className="flex gap-3 justify-between items-center flex-1">
                  <p>
                    {friend.messageBoard.startsWith('http') ? (
                      <a
                        href={friend.messageBoard}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500"
                      >
                        {friend.messageBoard}
                      </a>
                    ) : (
                      friend.messageBoard
                    )}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>邀約列表（0）</AccordionTrigger>
        <AccordionContent>
          <section className="flex gap-6 py-3 justify-between flex-1 px-3">
            <img
              src={tempAvatar}
              alt="user avatar"
              className="w-14 h-14 bg-slate-400 object-cover "
            />

            <div className="flex flex-col gap-3 justify-start w-full">
              <div className="flex items-center gap-3 justify-start flex-1">
                <span className="inline-block size-4 rounded-full bg-black " />
                <p>好友名稱</p>
              </div>

              <div className="flex gap-3 justify-between items-center">
                <p className="waiting-invite">等待對方接受邀請</p>
              </div>
            </div>
          </section>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
