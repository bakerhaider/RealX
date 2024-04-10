'use client';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import React, { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from './ui/use-toast';
import { Textarea } from './ui/textarea';

export function DialogDemo() {
  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);
  const sendImage = useMutation(api.messages.sendImage);
  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const sesh = useUser();
  const [content, setContent] = useState('');
  const { toast } = useToast();

  async function handleSendImage(event: FormEvent) {
    event.preventDefault();

    if (selectedImage) {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': selectedImage.type,
        },
        body: selectedImage,
      });
      const { storageId } = await result.json();
      await sendImage({
        storageId,
        author: (sesh?.user?.username as string) || '',
        content,
      });
      setSelectedImage(null);
      setContent('');
      imageInput.current!.value = '';
    } else {
      console.log('No image selected');
    }

    toast({
      title: 'Posted!',
    });
  }

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="text-black"
      >
        <Button variant="outline">Make a post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader></DialogHeader>

        <form
          onSubmit={handleSendImage}
          className="space-y-8"
        >
          <Textarea
            placeholder="Type your message here."
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <Input
            type="file"
            accept="image/*"
            required
            ref={imageInput}
            onChange={(event) => setSelectedImage(event.target.files![0])}
            disabled={selectedImage !== null}
          />

          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const Header = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch  gap-4">
            <SignedIn>
              <DialogDemo />
            </SignedIn>
            <div className="sm:ml-6 flex justify-center">
              <div className="flex space-x-4">
                <SignedOut>
                  <Link
                    href={'/sign-in'}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Sign in
                  </Link>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
