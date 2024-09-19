export const isEmpty = (value: string) => '' === value.trim();

export const isIdValid = (value: string) => import.meta.env.VITE_CSMS_ID === value;

export const isPasswordValid = (value: string) => import.meta.env.VITE_CSMS_PASSWORD === value;
