import styles from "./LoginForm.module.scss";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../FormField/FormField";
import EmailIcon from "../../../assets/icons/email.svg?react";
import PasswordIcon from "../../../assets/icons/password.svg?react";
import { Button } from "../../Button/Button";
import Api from "../../../api/api";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../api/queryClient";

const LoginUserScheme = z.object({
  email: z.string().email("Некорректный формат email"),
  password: z.string().min(8, "Длина пароля должна быть не менее 8 символов"),
});

type LoginUserForm = z.infer<typeof LoginUserScheme>;

const loginUserWrapper = (data: LoginUserForm) => {
  return Api.loginUser(data.email, data.password);
};

interface LoginFormProps {
  handleLoginSuccess: (userName: string) => void;
}

export const LoginForm = ({ handleLoginSuccess }: LoginFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserForm>({
    resolver: zodResolver(LoginUserScheme),
    mode: "onSubmit",
  });

  const loginMutation = useMutation(
    {
      mutationFn: loginUserWrapper,
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
        setServerError(null);
        const user = await Api.fetchUser();
        handleLoginSuccess(user.name);
      },
      onError: (error) => {
        setServerError(error.message);
      },
    },
    queryClient
  );

  const handleInputChange = () => {
    setServerError(null);
  };

  return (
    <form
      className={styles.login__form}
      onSubmit={handleSubmit((data) => loginMutation.mutate(data))}
    >
      <FormField
        errorMessage={errors.email?.message}
        icon={<EmailIcon />}
        serverError={serverError}
      >
        <input
          placeholder="Электронная почта"
          {...register("email")}
          onChange={(e) => {
            register("email").onChange(e);
            handleInputChange();
          }}
        />
      </FormField>

      <FormField
        errorMessage={errors.password?.message}
        icon={<PasswordIcon />}
        serverError={serverError}
      >
        <input
          type="password"
          placeholder="Пароль"
          {...register("password")}
          onChange={(e) => {
            register("password").onChange(e);
            handleInputChange();
          }}
        />
      </FormField>

      <Button text="Войти" isLoading={loginMutation.isPending} />

      {serverError && <div className={styles.login__error}>{serverError}</div>}
    </form>
  );
};
