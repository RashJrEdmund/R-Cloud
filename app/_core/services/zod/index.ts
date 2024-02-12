/* FILE_DESC +=> =============================
| will write all zod schema validations here |
============================================*/

import { z } from 'zod';

const ZAuthFormSchema = z.object({
  username: z.string({
    required_error: 'required',
    invalid_type_error: 'must be a string',
  }).min(2, 'must be atleast 2 characters'),

  email: z.string().email('Invalid email'),

  password: z.string().min(6, 'must be atleast 6 characters'),

  confirm_password: z.string().min(6, 'must be atleast 6 characters'),

  date_of_birth: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: 'Set a valid date!',
  }).min(new Date('1900-01-01'), { message: 'Too old' })
    .max(new Date(), { message: 'Too young!' })
});

export {
  ZAuthFormSchema,
};
