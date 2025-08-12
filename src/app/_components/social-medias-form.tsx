"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
	socialMediasFormSchema,
	SocialMediasFormSchema,
} from "../_schemas/profile-schema";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export default function SocialMediasForm() {
	const {
		register,
		handleSubmit,
		formState: {errors},
		control,
	} = useForm<SocialMediasFormSchema>({
		resolver: zodResolver(socialMediasFormSchema),
	});

	const {fields, append, remove} = useFieldArray({
		control,
		name: "urls",
	});

	function onSubmit(data: SocialMediasFormSchema) {
		console.log(data);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-4 w-96 mx-auto mt-10"
		>
			{fields.map((field, index) => (
				<div key={field.id} className="flex gap-2">
					<div className="flex-1">
						<Input
							placeholder="ex.: https://instagram.com/gusquemfala"
							{...register(`urls.${index}.url`)}
						/>
						{errors?.urls?.[index]?.url && (
							<div className="text-red-500 text-xs">
								{errors.urls[index].url?.message}
							</div>
						)}
					</div>
					<Button
						type="button"
						variant="destructive"
						onClick={() => remove(index)}
					>
						Remover
					</Button>
				</div>
			))}

			<div className="flex gap-2">
				<Button
					type="button"
					variant="secondary"
					onClick={() => append({url: ""})}
				>
					Adicionar URL
				</Button>

				<Button type="submit">Salvar</Button>
			</div>
		</form>
	);
}
