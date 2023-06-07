import React from "react";
import { Button, TextField } from "@material-ui/core";
import { Alert } from '@material-ui/lab';

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie } from "nookies";

import { LoginFormSchema } from "../../../utils/schemas/validations";
import { FormField } from "../../FormField";
import { LoginDto } from "../../../utils/api/types";
import { useAppDispatch } from "../../../redux/hooks";
import { setUserData } from "../../../redux/slices/user";
import { Api } from "../../../utils/api";
interface LoginProps {
  onOpenRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onOpenRegister }) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = React.useState('');
  const form = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit = async (dto: LoginDto) => {
    try {
      const data = await Api().user.login(dto);
      console.log(data);
      setCookie(null, 'authToken', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      setErrorMessage('');
      dispatch(setUserData(data));
    } catch (err) {
      console.warn('Login error', err);
      if (err.response) {
        setErrorMessage(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="email" label="Email" />
          <FormField name="password" label="Password" />
          {errorMessage && 
            <Alert severity="error" className="mb-20"> {errorMessage} 
            </Alert>
          }
          <div className="d-flex align-center">
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting }
              type="submit"
              color="primary"
              variant="contained"
            >
              Войти
            </Button>
            <Button
              onClick={onOpenRegister}
              color="primary"
              variant="text"
              className="ml-10"
            >
              Регистрация
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
