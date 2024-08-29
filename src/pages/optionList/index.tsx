import { useEffect } from 'react';
import { Mail, Settings } from 'lucide-react';
import { useDispatch } from 'react-redux';

import {
  AddFriendDialog,
  MessageBoard,
  StatusGroup,
  ComplexList,
  LogoutBtn,
  Input,
} from '@/components/';
import { useCurrentUser } from '@/hooks';
import { useToast } from '@/components/ui/use-toast';
import { setCurrentUser } from '@/features/userSlice';
import { fetchUser } from '@/api';
import { Profile } from '@/types';
import defaultAvatar from '@/assets/images/user/defaultAvatar.webp';

export default function OptionList() {
  const currentUser = useCurrentUser();
  const { toast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchUser();
      dispatch(setCurrentUser(res.data as unknown as Profile));
    };

    fetchData();
  }, [dispatch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'busy':
        return 'bg-red-500';
      case 'offline':
        return 'bg-gray-300';
      default:
        return 'bg-black';
    }
  };

  return (
    <div className="container space-y-3 relative">
      {/* 頭像區 */}
      <section className="flex gap-6 py-3 justify-between">
        <div className="flex-none size-32  grid place-content-center border overflow-hidden rounded-full">
          <img
            src={currentUser?.photo || defaultAvatar}
            alt="user avatar"
            className="size-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-3 justify-around w-full">
          <div className="flex items-center gap-3 justify-around flex-1 ">
            <span
              className={`inline-block size-2 rounded-full ${getStatusColor(currentUser?.onlineStatus)}`}
            />
            <h2 className="text-base font-bold">
              <p>{currentUser?.name || 'No user'}</p>
            </h2>
            <div className="yahoo-btn-cls">
              <StatusGroup />
            </div>
          </div>

          <MessageBoard currentUser={currentUser} />

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
        />
      </section>

      {/* 複合列表 */}
      <ComplexList />
    </div>
  );
}
