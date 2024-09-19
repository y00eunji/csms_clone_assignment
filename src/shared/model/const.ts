export const ERROR_CODE = [1004, 1002, 2013] as const;

export type TYPE_ERROR_CODE = (typeof ERROR_CODE)[number];
