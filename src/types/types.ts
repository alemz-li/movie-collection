import { AnyZodObject, ZodEffects } from "zod";

export type MessageResponse = {
  message: string | string[];
};

export interface ErrorResponse extends MessageResponse {
  stack?: string;
}

export type RequestValidator = {
  params?: AnyZodObject;
  body?: AnyZodObject | ZodEffects<AnyZodObject>;
  query?: AnyZodObject;
};
