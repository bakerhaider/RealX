'use client';
import Header from '@/components/Header';
import PostCard from '@/components/PostCard';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';

export default function Home() {
  const onClick = useMutation(api.files.createFile);
  const getFiles = useQuery(api.files.getFiles);
  return (
    <main className=" bg-black text-white">
      <Header />
      <PostCard />
    </main>
  );
}
