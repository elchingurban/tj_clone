import React from "react";
import { Button, TextField } from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { LoginFormSchema } from "../../../utils/schemas/validations";
import { FormField } from "../../FormField";

interface LoginProps {
  onOpenRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onOpenRegister }) => {
  
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginFormSchema)
  })
  const onSubmit = data => console.log(data);

  console.log(form.formState.errors);
  // console.log({...form});

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="email" label="Email" />
          <FormField name="password" label="Password" />
        </form>
      </FormProvider>

        <div className="d-flex align-center">
          <Button color="primary" variant="contained">
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
      
    </div>
  );
};

export default Login;
