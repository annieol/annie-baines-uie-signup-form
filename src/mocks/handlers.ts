import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/sign-ups', async () => {
    await delay(1000);
    return new HttpResponse(null, { status: 200 });
  }),
];
