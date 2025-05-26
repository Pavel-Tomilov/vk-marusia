import styles from "./RegisterForm.module.scss";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Api from "../../../api/api";
import EmailIcon from "../../../assets/icons/email.svg?react";
import UserIcon from "../../../assets/icons/user.svg?react";
import PasswordIcon from "../../../assets/icons/password.svg?react";
import { Button } from "../../Button/Button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../api/queryClient";
import { FormField } from "../FormField/FormField";

const RegisterUserSchema = z
  .object({
    email: z.string().email("Некорректный формат email"),
    name: z
      .string()
      .regex(/^[a-zA-Zа-яА-ЯЁё\s\-]+$/, "Недопустимые символы")
      .max(20, "Длина имени не должна превышать 20 символов"),
    surname: z
      .string()
      .regex(/^[a-zA-Zа-яА-ЯЁё\s\-]+$/, "Недопустимые символы")
      .max(20, "Длина фамилии не должна превышать 20 символов"),
    password: z.string().min(8, "Длина пароля должна быть не менее 8 символов"),
    confirmPassword: z
      .string()
      .min(8, "Длина пароля должна быть не менее 8 символов"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли должны совпадать",
    path: ["confirmPassword"],
  });

type RegisterUserForm = z.infer<typeof RegisterUserSchema>;

const registerUserWrapper = (data: RegisterUserForm) => {
  return Api.registerUser(data.email, data.name, data.surname, data.password);
};

interface RegisterFormProps {
  handleRegistrationSuccess: () => void;
}

export const RegisterForm = ({
  handleRegistrationSuccess,
}: RegisterFormProps) => {
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterUserForm>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const registerMutation = useMutation(
    {
      mutationFn: registerUserWrapper,
      onSuccess() {
        setServerSuccess("Регистрация успешна! Перенаправляем...");
        setServerError(null);
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
        reset();
        handleRegistrationSuccess();
      },
      onError(error) {
        console.log("Ошибка регистрации:", error.message);
        setServerSuccess(null);

        if (error?.message) {
          setServerError(error.message);
        } else {
          setServerError("Произошла ошибка при регистрации");
        }
      },
    },
    queryClient
  );

  return (
    <form
      className={styles.register__form}
      onSubmit={handleSubmit((data) => {
        registerMutation.mutate(data);
      })}
    >
      <h3 className={styles.register__title}>Регистрация</h3>
      <FormField
        errorMessage={errors.email?.message}
        icon={<EmailIcon />}
        serverError={serverError}
      >
        <input {...register("email")} placeholder="Электронная почта" />
      </FormField>
      <FormField errorMessage={errors.name?.message} icon={<UserIcon />}>
        <input {...register("name")} placeholder="Имя" />
      </FormField>
      <FormField errorMessage={errors.surname?.message} icon={<UserIcon />}>
        <input {...register("surname")} placeholder="Фамилия" />
      </FormField>
      <FormField
        errorMessage={errors.password?.message}
        icon={<PasswordIcon />}
      >
        <input type="password" {...register("password")} placeholder="Пароль" />
      </FormField>
      <FormField
        errorMessage={errors.confirmPassword?.message}
        icon={<PasswordIcon />}
      >
        <input
          type="password"
          {...register("confirmPassword")}
          placeholder="Подтвердите пароль"
        />
      </FormField>

      <Button text="Создать аккаунт" isLoading={registerMutation.isPending} />

      {serverError && (
        <span className={styles.register__error}>{serverError}</span>
      )}
    </form>
  );
};
