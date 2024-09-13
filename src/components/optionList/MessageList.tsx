import { useMemo, useRef, useEffect } from 'react';
import { MessageListType, MessageListProps } from '@/types';

export function MessageList({ messageList, uuid, friend: friendInfo }: MessageListProps) {
  const messageListRef = useRef<HTMLUListElement>(null);

  const filterMessageList = useMemo(
    () => messageList?.filter((item: MessageListType) => (item?.toId === friendInfo._id
      || item?.uuid === friendInfo._id
    )),
    [messageList, friendInfo],
  );

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  const handleLastMessageAnimation = () => {
    const lastMessage = filterMessageList?.[filterMessageList.length - 1];
    if (lastMessage?.content === '有人在家嗎？') {
      const lastMessageElement = messageListRef.current?.lastElementChild;
      const roomElement = messageListRef.current;
      if (lastMessageElement) {
        roomElement?.classList.add('animate-shake-message');
        const pElements = lastMessageElement.querySelectorAll('p');
        pElements.forEach(p => {
          p.classList.add('animate-shake-message', 'text-red-400', 'text-2xl');
        });
        const handleAnimationEnd = () => {
          lastMessageElement.classList.remove('animate-shake-message');
          lastMessageElement.removeEventListener('animationend', handleAnimationEnd);
        };
        lastMessageElement.addEventListener('animationend', handleAnimationEnd);
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
    handleLastMessageAnimation();
  }, [filterMessageList]);

  return (
    <ul ref={messageListRef} className="m-2 h-full space-y-4 overflow-y-auto overflow-x-hidden border p-2 ">
      {filterMessageList?.map((item, index) => (
        <li
          key={item.id}
          className={`mb-2 ${item?.uuid === uuid ? 'text-end' : ''}`}
        >
          {/* 日期 */}
          {index === 0 || new Date(item?.createdAt).toLocaleDateString() !== new Date(filterMessageList[index - 1]?.createdAt).toLocaleDateString() ? (
            <div className="my-5  text-center text-[10px]  text-gray-400">
              {new Date(item?.createdAt).toLocaleDateString()}
            </div>
          ) : null}

          <div
            className={`flex justify-start ${item?.uuid === uuid ? 'flex-row-reverse gap-3' : ''}`}
          >
            <img
              src={item?.photo}
              className={`mr-2 inline-block size-10 rounded-full border
                border-gray-500 align-middle
                ${item?.uuid === uuid ? 'hidden' : 'block'}
                `}
              alt="User"
            />

            <div className={`group  flex items-end gap-x-1 space-y-1 ${item?.uuid === uuid ? 'flex-row-reverse' : ''}`}>
              <p className="inline-block max-w-[200px] cursor-text break-words rounded-lg border p-1 ">
                {item?.content}
              </p>
              <span className="hidden  text-[10px]  text-gray-400 group-hover:inline-block">
                {new Date(item?.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
