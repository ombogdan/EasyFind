export const handleBackendErrors = (errors: any, setError: any) => {
  Object.keys(errors).forEach((fieldName: string) => {
    setError(`${fieldName}`, {
      message: `${errors[fieldName].join(',')}`,
    });
  });
};
