import React, { useEffect, useState } from 'react';
import { Check, Edit } from 'lucide-react';

import { Button, Textarea, toast } from '@/components';
import { Profile } from '@/types';
import { updateProfile } from '@/api';
import { useCurrentUser } from '@/hooks';

type MessageBoardProps = {
  currentUser: Profile;
};

export function MessageBoard({ currentUser }: MessageBoardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { setCurrentUser } = useCurrentUser();

  useEffect(() => {
    setInputValue(currentUser?.messageBoard);
  }, [currentUser?.messageBoard]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim().length > 30) {
      toast({
        description: '留言板字數不可超過 30 字',
        variant: 'error',
      });
      return;
    }

    const updatedProfileContent = { ...currentUser, messageBoard: inputValue };
    setCurrentUser(updatedProfileContent);
    updateProfile(updatedProfileContent);
    toast({
      description: '留言板已更新',
      variant: 'success',
    });

    setIsEditing(false);
  };

  return (
    <div className="flex yahoo-btn-cls">
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="flex items-center w-full"
        >
          <div className="flex-1">
            <div className="!border !border-gray-800">
              <Textarea
                placeholder="留下心情或分享連結..."
                value={inputValue}
                className="w-full h-full p-1"
                onChange={e => setInputValue(e.target.value)}
              />
            </div>
            <p className="text-end">
              {inputValue.length}
              /30
            </p>
          </div>
          <Button
            type="submit"
            className="p-0"
          >
            <Check className="size-6 pl-1" />
          </Button>
        </form>
      ) : (
        <div className="flex items-center w-full group">
          {currentUser?.messageBoard?.startsWith('https') ? (
            <a
              href={currentUser?.messageBoard}
              className="text-sm flex-1 underline break-all"
              target="_blank"
              rel="noreferrer"
            >
              {currentUser?.messageBoard}
            </a>
          ) : (
            <p
              className={`text-sm flex-1 ${!currentUser?.messageBoard?.trim() ? 'italic text-gray-400' : ''}`}
            >
              {currentUser?.messageBoard?.trim()
                ? currentUser.messageBoard
                : '留下心情或分享連結...'}
            </p>
          )}
          <Edit
            className="cursor-pointer size-6 pl-1 opacity-0 group-hover:opacity-100"
            onClick={() => setIsEditing(true)}
          />
        </div>
      )}
    </div>
  );
}
