import React from "react";
import { Button } from "@material-ui/core";
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { setCookie } from "nookies";

import { RegisterFormSchema } from "../../../utils/schemas/validations";
import { FormField } from "../../FormField";
import { CreateUserDto } from "../../../utils/api/types";
import { UserApi } from "../../../utils/api";

interface LoginFormProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

export const Register: React.FC<LoginFormProps> = ({ onOpenRegister, onOpenLogin }) => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      const data = await UserApi.register(dto);
      console.log(data);
      setCookie(null, 'authToken', data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    } catch (err) {
      alert('Ошибка при регистрации');
      console.warn('Register error', err);
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <FormField name="fullName" label="Имя и фамилия" />
        <FormField name="email" label="Почта" />
        <FormField name="password" label="Пароль" />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="d-flex align-center justify-between">
            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              onClick={onOpenRegister}
              type="submit"
              color="primary"
              variant="contained"
            >
              Зарегистрироваться
            </Button>
            <Button onClick={onOpenLogin} color="primary" variant="text">
              Войти
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Register;
