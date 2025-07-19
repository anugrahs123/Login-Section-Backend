import Joi from "joi";
import { ApiError } from "../../utils/apiError";

export const validateLogin = (data: { email?: string; password?: string }) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required",
    }),
  });

  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    throw new ApiError(400, message);
  }
};
