import { SignUpFieldConfig } from './sign-up.model';

export const SignUpFields: SignUpFieldConfig[] = [
  {
    name: 'firstName',
    type: 'text',
    label: 'First name',
    autocomplete: 'given-name',
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last name',
    autocomplete: 'family-name',
  },
  {
    name: 'emailAddress',
    type: 'email',
    label: 'Email address',
    autocomplete: 'email',
  },
];
