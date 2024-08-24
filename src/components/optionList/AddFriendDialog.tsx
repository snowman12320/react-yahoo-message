import { Copy, Plus, Check } from 'lucide-react';
import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@/components/';

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
          console.info('Invite code copied to clipboard');
          setIsCopied(true); // Update state on successful copy
          setTimeout(() => setIsCopied(false), 2000); // Reset state after 2 seconds
        })
        .catch((err) => {
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

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>邀約成為好友</DialogTitle>
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
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
