// 'use server';
// THIS IS TO ENSURE THAT THE LOGIN AND SIGNUP FUNCTIONS RN ON THE SERVER.

export const handleFormAction = (formData: FormData, formAction: (_: FormData) => void, ) => {
  formAction(formData);
};
