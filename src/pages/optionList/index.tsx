import { useEffect, useCallback, useState } from 'react';
import { Mail, Settings } from 'lucide-react';

import {
  AddFriendDialog,
  AvatarInputFile,
  MessageBoard,
  StatusGroup,
  ComplexList,
  LogoutBtn,
  Input,
  toast,
} from '@/components';
import { useCurrentUser } from '@/hooks';
import { fetchUser } from '@/api';
import { Profile } from '@/types';
import defaultAvatar from '@/assets/images/user/defaultAvatar.webp';

export default function OptionList() {
  const { setCurrentUser, getCurrentUser, getStatusColor } = useCurrentUser();
  const [searchTerm, setSearchTerm] = useState(''); // 新增

  const memoizedSetCurrentUser = useCallback((user: Profile) => {
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchUser();
      memoizedSetCurrentUser(res.data as unknown as Profile);
    };

    fetchData();
  }, [memoizedSetCurrentUser]);

  return (
    <div className="container space-y-3 relative">
      {/* 頭像區 */}
      <section className="flex gap-6 py-3 justify-between">
        <div className="flex-none size-32  grid place-content-center border overflow-hidden rounded-full relative group ">
          <img
            src={getCurrentUser()?.photo || defaultAvatar}
            alt="user avatar"
            className="size-full object-cover"
            onError={e => {
              e.currentTarget.src = defaultAvatar;
            }}
          />
          <AvatarInputFile currentUser={getCurrentUser()} />
        </div>

        <div className="flex flex-col gap-3 justify-around w-full">
          <div className="flex items-center gap-3 justify-around flex-1 ">
            <span
              className={`inline-block size-4 rounded-full ${getStatusColor(getCurrentUser()?.onlineStatus)}`}
            />
            <h2 className="text-base font-bold">
              <p>{getCurrentUser()?.name || 'No user'}</p>
            </h2>
            <div className="yahoo-btn-cls">
              <StatusGroup />
            </div>
          </div>

          <MessageBoard currentUser={getCurrentUser()} />

          <div className="flex gap-3 justify-between items-center">
            <div className="flex gap-3 items-center">
              <AddFriendDialog />
              <Mail className="cursor-pointer size-6" />
              <Settings
                className="cursor-pointer size-6"
                onClick={() => {
                  toast({
                    description: '功能開發中',
                    variant: 'info',
                  });
                }}
              />
            </div>

            <LogoutBtn
              buttonText=""
              className="cursor-pointer size-6"
            />
          </div>
        </div>
      </section>

      {/* 搜尋框 */}
      <section>
        <Input
          type="text"
          placeholder="搜尋好友"
          className="rounded-md"
          onChange={e => setSearchTerm(e.target.value)}
        />
      </section>

      {/* 複合列表 */}
      <ComplexList searchTerm={searchTerm} />
    </div>
  );
}
