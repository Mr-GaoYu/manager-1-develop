import { array, boolean, lazy, mixed, number, object, string } from 'yup';

const stackscript_data = array().of(object()).nullable(true);

export const ruaInterfaceItemSchema = object({
  id: number().required('Interface ID is required.')
}).default(undefined);

export const ruaInterfaceSchema = lazy((obj?: Record<any, any>) =>
  typeof obj === 'undefined'
    ? object().notRequired()
    : object(Object.keys(obj).map((_) => ruaInterfaceItemSchema) as any)
);
