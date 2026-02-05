import * as yup from "yup";

const registerSchema = yup.object({
  userName: yup
    .string()
    .min(3, "userName must be atleast 3 characters long")
    .max(30, "userName cannot exceed 30 characters")
    .required("userName is required"),

  password: yup
    .string()
    .min(6, "password must be atleast 6 characters long")
    .max(50, "password cannot exceed 50 characters")
    .required("Password is required"),

  email: yup.string().email("Please provide a valid email address").required("Email is required"),
});

const taskSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

export { registerSchema, taskSchema };
