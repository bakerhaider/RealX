/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const PostCard = () => {
  const getFiles = useQuery(api.files.getFiles);
  return (
    <article className="flex items-start p-2 border-neutral-50 flex-col space-y-3">
      {getFiles?.map((data) => (
        <Card
          className="w-full max-w-lg mx-auto"
          key={data?._id}
        >
          <div className="p-4 space-y-4">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <Avatar>
                  <AvatarImage
                    width={48}
                    height={48}
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="font-bold"> {data?.username} </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    @{data?.username}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {' '}
                    {data?._creationTime}{' '}
                  </div>
                </div>
                <p className="text-base leading-snug">{data?.content}</p>
              </div>
            </div>
            <div className="w-full">
              <div className="aspect-w-16 aspect-h-8">
                <img
                  src="https://pbs.twimg.com/media/GKUrFZtW4AAxz0M?format=jpg&name=medium"
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
