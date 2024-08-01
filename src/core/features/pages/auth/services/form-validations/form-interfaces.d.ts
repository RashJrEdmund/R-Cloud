interface FieldErrors {
  password?: string;
  email?: string;
  username?: string;
  date_of_birth?: Date | string;
  confirm_password?: string;
}

interface AuthFormState<T = FieldErrors> {
  message: string | null;
  data: T | null;
  errors?: T | null;
}

export type { AuthFormState, FieldErrors };
