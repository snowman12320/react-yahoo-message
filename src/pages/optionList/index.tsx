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
    <div className="container relative space-y-3">
      {/* 頭像區 */}
      <section className="flex justify-between gap-6 py-3">
        <div className="group relative  grid size-32 flex-none place-content-center overflow-hidden rounded-full border ">
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

        <div className="flex w-full flex-col justify-around gap-3">
          <div className="flex flex-1 items-center justify-around gap-3 ">
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

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <AddFriendDialog />
              <Mail className="size-6 cursor-pointer" />
              <Settings
                className="size-6 cursor-pointer"
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
              className="size-6 cursor-pointer"
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
