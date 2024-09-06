import { useMemo } from 'react';
import { MessageListType, MessageListProps } from '@/types';

export function MessageList({ messageList, uuid, friend }: MessageListProps) {
  const fileterMessageList = useMemo(
    () => messageList?.filter((item: MessageListType) => (item?.toId === friend._id
      || item?.uuid === friend._id
    )),
    [messageList, uuid, friend],
  );

  return (
    <ul id="messageList" className="h-full overflow-y-auto">
      {fileterMessageList?.map(item => (
        <li
          key={item.id}
          className={`mb-2 ${item?.uuid === uuid ? 'text-end' : ''}`}
        >
          {item.id}
          <div
            className={`flex justify-start ${item?.uuid === uuid ? 'flex-row-reverse gap-3' : ''}`}
          >
            <div>
              <img
                src={item?.photo}
                className="mr-2 inline-block size-10 rounded-full border
                 border-gray-500 align-middle"
                alt="User"
              />
            </div>
            <div>
              <p>{uuid}</p>
              <p>{item?.toId}</p>
              <p>{item?.content}</p>
              <p className="text-B4 text-gray-400">
                {new Date(item?.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
