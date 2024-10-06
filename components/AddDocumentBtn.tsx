'use client';

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { createDocument } from '@/lib/actions/room.action';

const AddDocumentBtn = ({userId,email}:AddDocumentBtnProps) => {
  const router= useRouter();
  const AddDocumentHandler=async ()=>{
    try {
      const room = await createDocument({userId,email});

      if(room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div>
      <Button type="submit" onClick={AddDocumentHandler}
        className='gradient-blue flex gap-1 shadow-md'>
        <Image src={'/assets/icons/add.svg'} alt={'add'} width={24} height={24}
        />
        <p className='hidden sm:block'>start a blank document</p>
      </Button>
    </div>
  )
}

export default AddDocumentBtn
