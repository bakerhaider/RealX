import Header from '@/components/Header';
import Loading from '@/components/Loading';
import PostCard from '@/components/PostCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <main className=" bg-black text-white h-full">
      <Suspense fallback={<Loading />}>
        <Header />
        <PostCard />
      </Suspense>
    </main>
  );
}
