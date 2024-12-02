import type { Action } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { passwordLoginSchema } from './Forms/passwordLogin.form';

export const loginFormAction: Action = async (ctx) => {
	const form = await superValidate(ctx, zod(passwordLoginSchema));
	if (!form.valid) {
		fail(400, form);
	}
	return {
		form
	};
};
