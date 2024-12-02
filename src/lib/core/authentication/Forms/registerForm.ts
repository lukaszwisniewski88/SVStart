import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod as zodAdapter } from 'sveltekit-superforms/adapters';

export const registerSchema = z
	.object({
		email: z.string({ message: 'Proszę uzupełnić pole poprawnym adresem e-mail' }).email({
			message: 'Proszę podać poprawny adres email'
		}),
		password: z
			.string({
				message: 'Proszę uzupełnić pole z hasłem'
			})
			.min(8, 'Hasło musi zawierać co najmniej 8 znaków'),
		confirmPassword: z
			.string({
				message: 'Proszę uzupełnić pole z hasłem'
			})
			.min(8, 'Hasło musi zawierać co najmniej 8 znaków')
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{ message: 'Hasła nie są takie same' }
	);

const valuesDefault = {
	email: '',
	password: '',
	confirmPassword: ''
};

export const getForm = async (defaults?: z.infer<typeof registerSchema>) =>
	await superValidate(
		zodAdapter(registerSchema, {
			defaults: defaults || valuesDefault
		})
	);
