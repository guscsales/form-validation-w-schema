"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {FormEvent, useRef, useState} from "react";
import {SignUpFormSchema, signUpFormSchema} from "../_schemas/auth-schema";
import {z} from "zod";

export default function SignUpForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<z.ZodError<SignUpFormSchema>>();

  const formErrors = errors ? z.treeifyError(errors)?.properties : null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(formRef.current!);
    const data = Object.fromEntries(formData);

    const parsedData = signUpFormSchema.safeParse(data);

    if (!parsedData.success) {
      setErrors(parsedData.error);
      return;
    }

    setErrors(undefined);

    console.log("Formulário final, onde eu chamo a API ->", data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="space-y-4 w-96 mx-auto mt-10"
    >
      <div>
        <Input name="name" placeholder="Nome" />
        {formErrors?.name && (
          <div className="text-red-500 text-xs">
            {formErrors?.name.errors[0]}
          </div>
        )}
      </div>
      <div>
        <Input name="email" placeholder="Email" type="email" />
        {formErrors?.email && (
          <div className="text-red-500 text-xs">
            {formErrors?.email.errors[0]}
          </div>
        )}
      </div>
      <div>
        <Input name="password" placeholder="Senha" type="password" />
        {formErrors?.password && (
          <div className="text-red-500 text-xs">
            {formErrors?.password.errors[0]}
          </div>
        )}
      </div>
      <div>
        <Input
          name="confirmPassword"
          placeholder="Confirmar Senha"
          type="password"
        />
        {formErrors?.confirmPassword && (
          <div className="text-red-500 text-xs">
            {formErrors?.confirmPassword.errors[0]}
          </div>
        )}
      </div>

      <Button>Cadastrar</Button>
    </form>
  );
}
