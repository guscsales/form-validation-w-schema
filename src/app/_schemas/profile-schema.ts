import {z} from "zod";

export const socialMediasFormSchema = z.object({
	urls: z.array(
		z.object({
			url: z.url({error: "URL inválida"}),
		})
	),
});
export type SocialMediasFormSchema = z.infer<typeof socialMediasFormSchema>;
