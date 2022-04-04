import * as yup from "yup";

export const LoginFormSchema = yup.object({
  email: yup.string().email().required("Pochta obazatelna"),
  password: yup.string().min(6).required("Obazatelno"),
}).required();

export const RegisterFormSchema = yup
  .object()
  .shape({
    fullName: yup.string().required('Имя и фамилия обязательны'),
  })
  .concat(LoginFormSchema);
