import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b px-8 py-4">
    <Image
      src="/logos/lanes.svg"
      height={1000}
      width={1000}
      alt="patient"
      className="h-[22px] w-fit"
    />
    <Avatar>
      <AvatarImage src="" alt="@shadcn" />
      <AvatarFallback className="bg-black text-white">C</AvatarFallback>
    </Avatar>
  </div>  )
}

export default Header
