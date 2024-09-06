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
      <div className="absolute inset-0 hidden size-full rounded-full backdrop-blur-sm group-hover:grid">
        <Input
          className=" h-full opacity-0 hover:cursor-pointer"
          id="picture"
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={e => {
            handUploadProfilePhoto(e.target.files?.[0]);
          }}
        />
        <Upload
          color="white"
          className="pointer-events-none absolute inset-1/2  size-10 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div
        className={`absolute inset-0  size-full  rounded-full backdrop-blur-sm  ${isAvatarLoading ? 'block' : 'hidden'}`}
      >
        <div className="absolute inset-[35%]">
          <Loader2
            color="white"
            className="pointer-events-none   z-0 size-10 animate-spin"
          />
        </div>
      </div>
    </>
  );
}
