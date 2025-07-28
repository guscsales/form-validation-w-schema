"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { useRef, useState } from "react";
import { z } from "zod";

const signUpFormSchema = z.object({
	name: z.string().min(1, {message: "Nome é obrigatório"}).max(255),
	email: z.email({message: "Email inválido"}).max(255),
	password: z.string().min(8, {message: "Senha deve ter pelo menos 8 caracteres"}).max(255),
	confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
	message: "As senhas são diferentes",
	path: ["confirmPassword"]
})

type SignUpFormSchema = z.infer<typeof signUpFormSchema>;


export default function SignUpForm() {
  const formRef = useRef<HTMLFormElement>(null);
	const [errors, setErrors] = useState<z.ZodError<SignUpFormSchema>>();
	// v3
	// const formErrors = errors ? z.formatError(errors) : null;
	// v4
	const formErrors = errors ? z.treeifyError(errors)?.properties : null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(formRef.current!);
    const data = Object.fromEntries(formData);

		const parsedData = signUpFormSchema.safeParse(data);

		if (!parsedData.success) {
			setErrors(parsedData.error);
			return;
		}

		setErrors(undefined);

		console.log('Formulário válido ->', parsedData.data);
  }

	return (
		<form className="space-y-4 w-96 mx-auto mt-10" ref={formRef} onSubmit={handleSubmit}>
			<div>
				<Input name="name" placeholder="Nome" />
				{formErrors?.name && <p className="text-red-500 text-xs">{formErrors.name.errors[0]}</p>}
			</div>
			<div>
				<Input name="email" placeholder="Email" />
				{formErrors?.email && <p className="text-red-500 text-xs">{formErrors.email.errors[0]}</p>}
			</div>
			<div>
				<Input name="password" placeholder="Senha" type="password" />
				{formErrors?.password && <p className="text-red-500 text-xs">{formErrors.password.errors[0]}</p>}
			</div>
			<div>
				<Input name="confirmPassword" placeholder="Confirmar senha" type="password" />
				{formErrors?.confirmPassword && <p className="text-red-500 text-xs">{formErrors.confirmPassword.errors[0]}</p>}
			</div>

			<Button type="submit">Cadastrar</Button>
		</form>
	);
}
