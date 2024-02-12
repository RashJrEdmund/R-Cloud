/* FILE_DESC +=> =============================
| 😵‍💫. Contains form validation for the create |
| account forms, making use of zod            |
=============================================*/

import { ZAuthFormSchema } from '../../zod';
import type { AuthFormState } from '../form-interfaces';

function validateCreateAccountForm(rawFormData: { [key: string]: string }): AuthFormState {
  const validation = ZAuthFormSchema.safeParse(rawFormData);

  if (!validation.success) {
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

  const { data: { confirm_password, ...form_fields } } = validation;

  if (form_fields.password !== confirm_password) {
    return {
      message: 'passwords do not match',
      data: null,
      errors: {
        password: 'passwords do not match',
        confirm_password: 'passwords do not match',
      }
    };
  }

  return {
    message: 'success',
    data: form_fields,
    errors: null,
  };
};

export {
  validateCreateAccountForm,
};
