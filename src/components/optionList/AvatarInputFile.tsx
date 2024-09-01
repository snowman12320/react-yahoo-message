import { useState } from 'react';

import {
  Input, Upload, Loader2, toast,
} from '@/components';
import { uploadProfilePhoto } from '@/api';
import { Profile } from '@/types';
import { useCurrentUser } from '@/hooks';

export function AvatarInputFile({ currentUser }: { currentUser: Profile }) {
  const [isAvatarLoading, setAvatarLoading] = useState(false);
  const { setCurrentUser } = useCurrentUser();

  async function handUploadProfilePhoto(file: File | undefined) {
    if (file) {
      setAvatarLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      let res = { status: '', message: '', data: {} };

      try {
        res = await uploadProfilePhoto(formData);
        const { src } = res.data as unknown as { src: string };
        setCurrentUser({ ...currentUser, photo: src });
      } catch (error) {
        console.error('uploadProfilePhoto: ', error);
        res.message = (error as Error).message;
      } finally {
        setAvatarLoading(false);
        toast({
          description: res.message,
          variant: 'success',
        });
      }
    }
  }

  return (
    <>
      <div className="absolute inset-0 hidden size-full group-hover:grid backdrop-blur-sm rounded-full">
        <Input
          className=" hover:cursor-pointer z-1 w-full h-full opacity-0 "
          id="picture"
          type="file"
          accept="image/*"
          onChange={e => {
            handUploadProfilePhoto(e.target.files?.[0]);
          }}
        />
        <Upload
          color="white"
          className="size-10 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
        />
      </div>

      <div
        className={`absolute inset-0  size-full  backdrop-blur-sm rounded-full  ${isAvatarLoading ? 'block' : 'hidden'}`}
      >
        <div className="absolute inset-[35%]">
          <Loader2
            color="white"
            className="size-10   animate-spin z-0 pointer-events-none"
          />
        </div>
      </div>
    </>
  );
}
