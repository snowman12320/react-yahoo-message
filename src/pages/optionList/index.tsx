import { useEffect, useState } from 'react';
import {
  Mail, Loader2, Plus, Settings,
} from 'lucide-react';

import useCurrentUser from '@/hooks/useCurrentUser';
import { LogoutBtn } from '@/components/login/LogoutBtn';
import { Input } from '@/components/ui/input';
import { StatusGroup } from '@/components/optionList/StatusGroup';
import ComplexList from '@/components/optionList/ComplexList';
// import { fetchUser } from '@/api';
import { useToast } from '@/components/ui/use-toast';

export default function OptionList() {
  const currentUser = useCurrentUser();
  const [showImage, setShowImage] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   fetchUser().then((response) => {
  //     console.log('response', response);
  //   });
  // }, []);

  return (
    <div className="container space-y-3">
      {/* 頭像區 */}
      <section className="flex gap-6 py-3 justify-between">
        <div className="flex-none size-32  grid place-content-center border overflow-hidden">
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
            <span className="inline-block size-4 rounded-full bg-black " />
            <p>
              {currentUser ? (
                <p>{currentUser.name}</p>
              ) : (
                <p>No user logged in</p>
              )}
            </p>
            <div className="yahoo-btn-cls">
              <StatusGroup />
            </div>
          </div>

          <Input
            type="text"
            placeholder="你在做什麼？"
            className="rounded-md inline-block"
          />

          <div className="flex gap-3 justify-between items-center">
            <div className="flex gap-3 items-center">
              <Plus
                className="cursor-pointer size-6"
                absoluteStrokeWidth
              />
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
