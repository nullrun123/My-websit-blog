import { nextCookies } from 'better-auth/next-js';
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { auth } from './auth';

export const { signIn, signUp, signOut, useSession , updateUser ,sendVerificationEmail ,requestPasswordReset,resetPassword , changePassword} = createAuthClient({
    plugins:[ 
        inferAdditionalFields<typeof auth>(), 
        nextCookies()],
});