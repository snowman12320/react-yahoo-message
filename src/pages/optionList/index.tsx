import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Loader2, Plus, Settings } from 'lucide-react'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { LogoutBtn } from '@/components/login/LogoutBtn'
import { Input } from '@/components/ui/input'
import { StatusGroup } from '@/components/optionList/StatusGroup'
import { ComplexList } from '@/components/optionList/ComplexList'

export function OptionList() {
  const currentUser = useCurrentUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className=' container bg-gray-100'>
      {/* 頭像區 */}
      <section className='flex gap-6 py-3 justify-between'>
        <div className='flex-none size-32  grid place-content-center border overflow-hidden'>
          {showImage ? (
            <img
              src='https://firebasestorage.googleapis.com/v0/b/social-e030c.appspot.com/o/about%2FIMG_5026.jpg?alt=media&token=126ed273-0959-44d8-879e-8647c06d335c'
              alt='user avatar'
              className='size-full object-cover'
            />
          ) : (
            <Loader2 className='size-5 animate-spin' />
          )}
        </div>

        <div className='flex flex-col gap-3 justify-around w-full'>
          <div className='flex items-center gap-3 justify-around flex-1'>
            <span className='inline-block size-4 rounded-full bg-black '></span>
            <p>
              {currentUser ? (
                <p>{currentUser.email.split('@')[0]}</p>
              ) : (
                <p>No user logged in</p>
              )}
            </p>
            <StatusGroup />
          </div>

          <Input
            type='text'
            placeholder='你在做什麼？'
            className='rounded-md'
          />

          <div className='flex gap-3 justify-between items-center'>
            <div className='flex gap-3 items-center'>
              <Plus
                className='cursor-pointer size-6'
                absoluteStrokeWidth={true}
              />
              <Mail className='cursor-pointer size-6' />
              <Settings className='cursor-pointer size-6' />
            </div>

            <LogoutBtn
              buttonText=''
              className='cursor-pointer size-6'
            />
          </div>
        </div>
      </section>

      {/* 搜尋框 */}
      <section>
        <Input
          type='text'
          placeholder='搜尋好友'
          className='rounded-md'
        />
      </section>

      {/* 列表 */}
      <ComplexList />
    </div>
  )
}
