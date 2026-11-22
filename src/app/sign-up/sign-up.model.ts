export interface SignUpModel {
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export type SignUpFieldName = keyof SignUpModel;
type SignUpAutocompleteValues = 'given-name' | 'family-name' | 'email';

export interface SignUpFieldConfig {
  name: SignUpFieldName;
  type: 'text' | 'email';
  label: string;
  autocomplete: SignUpAutocompleteValues;
}
