import { loginFormAction } from '$lib/core/authentication/actions';
import { getForm } from '$lib/core/authentication/Forms/passwordLogin.form';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		form: await getForm()
	};
};

export const actions: Actions = {
	default: loginFormAction
};
