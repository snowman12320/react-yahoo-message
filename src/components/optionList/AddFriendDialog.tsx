import {
  Copy, Plus, Check, Loader2, Share2,
} from 'lucide-react';
import React, { useState } from 'react';
import liff from '@line/liff';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  Input,
  Label,
  toast,
} from '@/components';
import { useCurrentUser, useFriendList } from '@/hooks';
import { addFriend } from '@/api';

export function AddFriendDialog() {
  const { getCurrentUser } = useCurrentUser();
  const { fetchFriendList } = useFriendList();
  const [isCopied, setIsCopied] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [inputCode, setInputCode] = useState('');

  const copyCode = () => {
    const inviteCodeInput = document.getElementById(
      'inviteCode',
    ) as HTMLInputElement;
    if (inviteCodeInput) {
      navigator.clipboard
        .writeText(inviteCodeInput.value)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch(err => {
          console.error('😅 Failed to copy: ', err);
        });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAdding(true);
    let res = { status: '', message: '' };

    try {
      res = await addFriend(inputCode);
      await fetchFriendList();
    } catch (err) {
      console.error('😅 addFriend: ', err);
      res.message = (err as Error).message;
    } finally {
      setInputCode('');
      setIsAdding(false);
      toast({
        description: res.message,
        variant: res.status ? 'success' : 'error',
      });
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
  };

  const handleShareClick = async () => {
    const textContent = `邀請您加入我的 YahooMessage 好友列表，
邀請碼：${getCurrentUser()?._id}

請點擊以下 LIFF 瀏覽器連結，
開啟 YahooMessage（建議使用手機版），
（https://liff.line.me/2006148994-OaYeD74K）
並輸入邀請碼即可加入我的好友列表。`;

    try {
      await liff.shareTargetPicker([
        {
          type: 'text',
          text: textContent,
        },
      ]);
    } catch (error) {
      console.error('😅 Error sharing target picker:', error);
      toast({
        description: '需登入 LINE 會員 後才能分享',
        variant: 'error',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Plus
          className="size-6 cursor-pointer"
          absoluteStrokeWidth
        />
      </DialogTrigger>

      <DialogContent
        aria-describedby="dialog-description"
        className="sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle>邀約成為好友</DialogTitle>
          <DialogDescription id="dialog-description">
            請複製邀約碼並發送給您的朋友，或輸入您朋友的邀約碼以添加他們為好友。
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 flex items-center">
          <div className="relative grid flex-1 gap-2">
            <Label
              htmlFor="inviteCode"
              className="absolute -top-5 left-0"
            >
              複製邀約碼
            </Label>
            <Input
              className=""
              type="text"
              id="inviteCode"
              defaultValue={getCurrentUser()?._id}
              readOnly
            />
          </div>
          <Button
            type="button"
            size="sm"
            className="px-3"
            onClick={copyCode}
          >
            {isCopied ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleShareClick}
          >
            <Share2
              className="size-4"
            />
          </Button>
        </div>

        <div className="mt-5 flex items-center justify-start">
          <div className="relative grid flex-none gap-2">
            <Label
              htmlFor="inputCode"
              className="absolute -top-5 left-0"
            >
              輸入邀約碼
            </Label>
            <Input
              className="inline-block w-[170px]"
              type="text"
              id="inputCode"
              placeholder="輸入對方邀約碼"
              disabled={isAdding}
              value={inputCode}
              onChange={e => setInputCode(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            size="sm"
            disabled={isAdding || !inputCode}
            onClick={handleButtonClick}
          >
            {isAdding ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Plus className="size-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
