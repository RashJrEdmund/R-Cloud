interface IFieldErrors {
    password?: string;
    email?: string;
    username?: string;
    date_of_birth?: Date | string;
    confirm_password?: string;
  }

interface AuthFormState<T = IFieldErrors> {
  message: string | null;
  data: T | null;
  errors?: T | null;
};

export type {
  AuthFormState,
  IFieldErrors,
};
