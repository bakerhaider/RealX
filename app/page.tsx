'use client';
import { api } from '@/convex/_generated/api';
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';

export default function Home() {
  const onClick = useMutation(api.files.createFile);
  const getFiles = useQuery(api.files.getFiles);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black text-white">
      <SignedIn>
        <SignOutButton>out</SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton>in</SignInButton>
      </SignedOut>
      {getFiles?.map((data) => <h1 key={data?._id}>{data?.name}</h1>)}
      <button
        onClick={() => {
          onClick({
            name: 'fff',
          });
        }}
      >
        ex
      </button>
    </main>
  );
}
