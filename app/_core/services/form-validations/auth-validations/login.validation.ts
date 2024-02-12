/* FILE_DESC +=> =============================
| 😵‍💫. Contains form validation for the login |
==================================//========*/

import type { AuthFormState } from '../form-interfaces';
import { ZAuthFormSchema } from '../../zod';

function validateLoginForm(loginFormData: { [key: string]: string }): AuthFormState {

  const validation = ZAuthFormSchema.pick({
    email: true,
    password: true,
  }).safeParse(loginFormData);

  if (!validation.success) {
    /* DESC +=> =============================
    | fieldErrors is an object of type      |
    |    fieldErrors: {                     |
    |      email?: string[] | undefined;    |
    |      password?: string[] | undefined; |
    |    }                                  |
    ========================================*/
    const fieldErrors = validation.error.flatten().fieldErrors;
    const errors: { [key: string]: any } = {};

    type T = Record<string, string>;

    Object.keys(fieldErrors).forEach((key) => {
      errors[key] = (fieldErrors as T)[key] ? (fieldErrors as T)[key][0] : null;
    });

    return {
      errors,
      data: null,
      message: 'Missing Or Invalid Fields',
    };
  };

  const { data: form_fields } = validation;

  return {
    message: 'success',
    data: form_fields,
    errors: null,
  };
};

export {
  validateLoginForm,
};
