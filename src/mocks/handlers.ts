import { delay, http, HttpResponse } from 'msw';

export const SIGN_UP_URL = '/api/sign-ups';

export const handlers = [
  http.post(SIGN_UP_URL, async () => {
    await delay(1000);
    return new HttpResponse(null, { status: 200 });
  }),
];
