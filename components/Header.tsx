import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import React from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { createFile as createFileMutation } from '@/convex/files'; // Renamed
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from './ui/use-toast';

export function DialogDemo() {
  const sesh = useUser();
  const user = sesh;
  console.log(user);
  const { toast } = useToast();

  const formSchema = z.object({
    content: z.string().min(2, {
      message: 'content must be at least 2 characters.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createFile({
        username: user?.user?.username ?? '',
        content: values.content, // Fixed
        photoUrl: user?.user?.imageUrl,
      });
      form.reset();
      toast({
        title: 'Posted!',
      });
    } catch (error) {}
  }

  const createFile = useMutation(api.files.createFile);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader></DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter content"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const Header = () => {
  return (
    <nav className="bg-gray-800 text-white">
      {' '}
      {/* Changed text color */}
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
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
