/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';
import { FormEvent, useRef, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';

export default function App() {
  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);
  const sendImage = useMutation(api.messages.sendImage);
  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const sesh = useUser();
  const messages = useQuery(api.listMessages.list);
  const [content, setContent] = useState('');

  async function handleSendImage(event: FormEvent) {
    event.preventDefault();
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: {
        'Content-Type': selectedImage!.type,
      },
      body: selectedImage,
    });
    const { storageId } = await result.json();
    const res = await sendImage({
      storageId,
      author: (sesh?.user?.username as string) || '',
      content,
    });
    setSelectedImage(null);
    setContent('');
    imageInput.current!.value = '';
    console.log(res);
  }

  return (
    <div className="">
      {messages?.map((m: any) => (
        <div
          className=" border rounded-lg shadow-md p-4"
          key={m?._id}
        >
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/48"
              alt="Profile Picture"
              className="h-12 w-12 rounded-full mr-3"
            />
            <div>
              <h2 className="text-lg font-bold"> {m?.author} </h2>
              <p className="text-gray-600">@{m?.author}</p>
            </div>
          </div>
          <p className="text-gray-800 mt-4">
            This is a sample Twitter post with an image. It showcases how a
            typical tweet with a photo would look like using Tailwind CSS
            classes.
          </p>
          <img
            src={m?.url}
            alt="Post Image"
            className="mt-4 rounded-lg"
          />
        </div>
      ))}
      <form onSubmit={handleSendImage}>
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          onChange={(event) => setSelectedImage(event.target.files![0])}
          disabled={selectedImage !== null}
        />
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <input
          type="submit"
          value="Send Image"
          disabled={selectedImage === null}
        />
      </form>
    </div>
  );
}
