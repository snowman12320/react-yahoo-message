import { useEffect, useState } from 'react';
import {
  Mail, Loader2, Settings,
} from 'lucide-react';
import { useDispatch } from 'react-redux';

import { useCurrentUser } from '@/hooks';
import { LogoutBtn } from '@/components/login/LogoutBtn';
import { Input } from '@/components/ui/input';
import { StatusGroup } from '@/components/optionList/StatusGroup';
import ComplexList from '@/components/optionList/ComplexList';
import { useToast } from '@/components/ui/use-toast';
import { AddFriendDialog, MessageBoard } from '@/components/';
import { setCurrentUser } from '@/features/userSlice';
import { fetchUser } from '@/api';
import { Profile } from '@/types';

export default function OptionList() {
  const currentUser = useCurrentUser();
  const [showImage, setShowImage] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchUser();
      dispatch(setCurrentUser(res.data as unknown as Profile));
    };
    fetchData();
    setShowImage(true);
  }, [dispatch]);

  return (
    <div className="container space-y-3 relative">
      {/* 頭像區 */}
      <section className="flex gap-6 py-3 justify-between">
        <div className="flex-none size-32  grid place-content-center border overflow-hidden rounded-full">
          {showImage ? (
            <img
              src={currentUser?.photo}
              alt="user avatar"
              className="size-full object-cover"
            />
          ) : (
            <Loader2 className="size-5 animate-spin" />
          )}
        </div>

        <div className="flex flex-col gap-3 justify-around w-full">
          <div className="flex items-center gap-3 justify-around flex-1 ">
            <span className="inline-block size-2 rounded-full bg-black " />
            <h2 className="text-base font-bold">
              {currentUser ? (
                <p>{currentUser.name}</p>
              ) : (
                <p>No user logged in</p>
              )}
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

      {/* 列表 */}
      <ComplexList />
    </div>
  );
}
