import { useEffect, useMemo } from 'react';
import { SiLine } from 'react-icons/si';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChatRoom } from '@/components';
import {
  useFriendList, useCurrentUser, useMessageList, useInviteList,
} from '@/hooks';
import tempAvatar from '@/assets/images/user/defaultAvatar.png';
import { inviteListType } from '@/types';

export function ComplexList({ searchTerm }: { searchTerm: string }) {
  const { getStatusColor, getCurrentUser } = useCurrentUser();
  const { friendList, fetchFriendList } = useFriendList();
  const { fetchMessageList, messageList } = useMessageList();
  const { inviteList } = useInviteList();
  const currentUser = getCurrentUser();

  useEffect(() => {
    fetchFriendList();
    fetchMessageList();
  }, []);

  const filteredFriends = useMemo(
    () => friendList.filter(friend => friend.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [friendList, searchTerm],
  );

  // try {
  //   res = await addFriend(inputCode);
  //   await fetchFriendList();
  // } catch (err) {
  //   console.error('😅 addFriend: ', err);
  //   res.message = (err as Error).message;
  // } finally {
  //   setInputCode('');
  //   setIsAdding(false);
  //   toast({
  //     description: res.message,
  //     variant: res.status ? 'success' : 'error',
  //   });
  // }

  return (
    <Accordion
      type="multiple"
      className="yahoo-btn-cls"
      defaultValue={['item-1', 'item-2']}
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
              {messageList.filter(
                message => message.uuid === friend._id && !message.isRead,
              ).length > 0 && (
                <span className="absolute flex size-4 items-center justify-center rounded-full bg-red-500 text-center text-white">
                  {
                    messageList.filter(
                      message => message.uuid === friend._id && !message.isRead,
                    ).length
                  }
                </span>
              )}
            </section>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>{`邀約列表（${inviteList.length}）`}</AccordionTrigger>
        <AccordionContent>
          {inviteList.map((invite: inviteListType) => (
            <section key={invite.id} className="flex flex-1 justify-between gap-6 p-3">
              <img
                src={invite.to.photo || tempAvatar}
                alt="user avatar"
                className="size-14 bg-slate-400 object-cover "
              />

              <div className="flex w-full flex-col justify-start gap-3">
                <div className="flex flex-1 items-center justify-start gap-3">
                  <p>{invite.to.name}</p>
                </div>

                <div>
                  {invite.to._id === currentUser?._id ? (
                    <div className="flex items-center justify-end gap-3">
                      <span>拒絕</span>
                      <span>接受</span>
                    </div>
                  ) : (
                    <p className="waiting-invite">等待對方接受邀請</p>
                  )}
                </div>
              </div>
            </section>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
