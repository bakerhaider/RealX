import { SignIn } from '@clerk/nextjs';
import React from 'react';

const page = () => {
  return (
    <SignIn
      afterSignInUrl={'/'}
      afterSignUpUrl={'/'}
    />
  );
};

export default page;
