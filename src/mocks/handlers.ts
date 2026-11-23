import { delay, http, HttpResponse } from 'msw';
import { SIGN_UP_URL } from '../app/api/endpoints.constants';

export const handlers = [
  http.post(SIGN_UP_URL, async () => {
    await delay(1000);
    return new HttpResponse(null, { status: 200 });
  }),
];
