export const isEmpty = (value: unknown) => {
  return typeof value === 'string' && value === '';
};
