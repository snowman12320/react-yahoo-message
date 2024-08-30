import { Copy, Plus, Check } from 'lucide-react';
import { useState } from 'react';

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
} from '@/components';

export function AddFriendDialog() {
  const [isCopied, setIsCopied] = useState(false);

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
          console.error('Failed to copy: ', err);
        });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Plus
          className="cursor-pointer size-6"
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

        <div className="flex items-center space-x-2 mt-5">
          <div className="grid flex-1 gap-2 relative">
            <Label
              htmlFor="inviteCode"
              className="absolute left-0 -top-5"
            >
              複製邀約碼
            </Label>
            <Input
              className=""
              type="text"
              id="inviteCode"
              defaultValue="https://ui.shadcn.com/"
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
        </div>

        <div className="flex items-center space-x-2 mt-5">
          <div className="grid flex-1 gap-2 relative">
            <Label
              htmlFor="inputCode"
              className="absolute left-0 -top-5"
            >
              輸入邀約碼
            </Label>
            <Input
              className=""
              type="text"
              id="inputCode"
              defaultValue=""
              placeholder="輸入對方邀約碼"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
