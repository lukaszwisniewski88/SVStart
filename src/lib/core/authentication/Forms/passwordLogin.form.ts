import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod as zodAdapter } from 'sveltekit-superforms/adapters';

export const passwordLoginSchema = z.object({
	email: z.string({ message: 'Proszę uzupełnić pole poprawnym adresem e-mail' }).email({
		message: 'Proszę podać poprawny adres email'
	}),
	password: z
		.string({
			message: 'Proszę uzupełnić pole z hasłem'
		})
		.min(8, 'Hasło musi zawierać co najmniej 8 znaków')
});

const valuesDefault = {
	email: '',
	password: ''
};

export const getForm = async (defaults?: z.infer<typeof passwordLoginSchema>) =>
	await superValidate(
		zodAdapter(passwordLoginSchema, {
			defaults: defaults || valuesDefault
		})
	);
