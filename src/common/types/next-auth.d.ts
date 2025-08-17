import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    provider?: string;
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      nickname?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    provider?: string;
  }
}
