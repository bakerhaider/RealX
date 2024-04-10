/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from 'react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';

const PostCard = () => {
  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);
  const sendImage = useMutation(api.messages.sendImage);
  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const sesh = useUser();
  const messages = useQuery(api.listMessages.list);
  const [content, setContent] = useState('');

  return (
    <article className="flex items-start p-2 border-neutral-50 flex-col space-y-3">
      {messages?.map((data: any) => (
        <Card
          className="w-full max-w-lg mx-auto"
          key={data?._id}
        >
          <div className="p-4 space-y-4">
            <div className="flex space-x-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="font-bold"> {data?.author} </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    @{data?.author}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {' '}
                    {data && data._creationTime && (
                      <span>
                        {new Date(data._creationTime).toLocaleString(
                          undefined,
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                          }
                        )}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-base leading-snug">{data?.content}</p>
              </div>
            </div>
            <div className="w-full">
              <div className="aspect-w-16 aspect-h-8">
                <img
                  src={(data?.url as string) || ''}
                  alt="Image"
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </article>
  );
};

export default PostCard;
