import {
  Input, Upload, Loader2, toast,
} from '@/components';
import { uploadProfilePhoto } from '@/api';
import { Profile } from '@/types';
import { useLoading, useCurrentUser } from '@/hooks';

export function AvatarInputFile({ currentUser }: { currentUser: Profile }) {
  const { getIsLoading, setLoading } = useLoading();
  const isLoading = getIsLoading();
  const { setCurrentUser } = useCurrentUser();

  async function handUploadProfilePhoto(file: File | undefined) {
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      const res = await uploadProfilePhoto(formData);
      const { src } = res.data as unknown as { src: string };

      setCurrentUser({ ...currentUser, photo: src });
      setLoading(false);
      toast({
        description: res.message,
        variant: 'success',
      });
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
          onChange={(e) => {
            handUploadProfilePhoto(e.target.files?.[0]);
          }}
        />
        <Upload
          color="white"
          className="size-10 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
        />
      </div>

      <div
        className={`absolute inset-0  size-full  backdrop-blur-sm rounded-full  ${isLoading ? 'block' : 'hidden'}`}
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
