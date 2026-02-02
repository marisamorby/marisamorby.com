import { type Config } from '@netlify/functions';

export default async () => {
  await fetch('https://api.netlify.com/build_hooks/697fe979cba0de0edf1c550f', {
    method: 'POST',
  });
};

export const config: Config = {
  schedule: '@daily',
};
