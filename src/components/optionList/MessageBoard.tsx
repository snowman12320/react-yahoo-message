import React, { useEffect, useState } from 'react';
import { Check, Edit } from 'lucide-react';

import { Button, Textarea } from '@/components/';
import { Profile } from '@/types';
import { updateProfile } from '@/api';
import { useCurrentUser } from '@/hooks/';
import { toast } from '../ui/use-toast';

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
          <div className="!border !border-gray-800 flex-1">
            <Textarea
              placeholder="留下心情或分享連結..."
              value={inputValue}
              className="w-full h-full p-1"
              onChange={(e) => setInputValue(e.target.value)}
            />
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
