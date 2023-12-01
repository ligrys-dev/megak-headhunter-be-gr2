export type FailedEmails =
  | {
      email: string;
      errorDetails: string[];
    }[]
  | undefined;
