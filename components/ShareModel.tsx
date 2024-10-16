'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

import { useSelf } from '@liveblocks/react/suspense';
import React, { useState } from 'react';
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import UserTypeSelector from "./UserTypeSelector";
import Collaborator from "./Collaborators";
import { updateDocumentAccess } from "@/lib/actions/room.action";

const ShareModel = ({ roomId, collaborators, creatorId, currentUserType }: ShareDocumentDialogProps) => {
  const user = useSelf();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('viewer');

  const shareDocumentHandler = async () => {
    setLoading(true);

    try {
      await updateDocumentAccess({ 
        roomId, 
        email, 
        userType, 
        updatedBy: user.info,
      });
    } catch (error) {
      console.error('Error sharing document:', error);
    } finally {
      setLoading(false);
    }
  };

  const shareViaWhatsApp = () => {
    const message = `Check out this document: ${window.location.origin}/documents/${roomId}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="gradient-blue flex h-9 gap-1 px-4" disabled={currentUserType !== 'editor'}>
          <Image
            src="/assets/icons/share.svg"
            alt="share"
            width={20}
            height={20}
            className="min-w-4 md:size-5"
          />
          <p className="mr-1 hidden sm:block">
            Share
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Manage who can view this project</DialogTitle>
          <DialogDescription>Select which users can view and edit this document</DialogDescription>
        </DialogHeader>

        <Label htmlFor="email" className="mt-6 text-blue-100">
          Email address
        </Label>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 rounded-md bg-dark-400">
            <Input 
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="share-input"
            />
            <UserTypeSelector 
              userType={userType}
              setUserType={setUserType} // Fixed here
            />
          </div>
          <Button type="submit" onClick={shareDocumentHandler} className="gradient-blue flex h-full gap-1 px-5" disabled={loading}>
            {loading ? 'Sending...' : 'Invite'}
          </Button>
        </div>

        <div className="my-2 space-y-2">
          <ul className="flex flex-col">
            {collaborators.map((collaborator) => (
              <Collaborator 
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={collaborator.email}
                collaborator={collaborator}
                user={user.info}
              />
            ))}
          </ul>
        </div>

        <Button onClick={shareViaWhatsApp} className="gradient-green flex h-9 gap-1 px-4 mt-4">
          <Image
            src="/assets/icons/whatsapp.svg"
            alt="WhatsApp"
            width={20}
            height={20}
            className="min-w-4 md:size-5"
          />
          <p className="mr-1 hidden sm:block">
            Share via WhatsApp
          </p>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModel;
