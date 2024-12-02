import { getForm } from '$lib/core/authentication/Forms/registerForm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		form: await getForm()
	};
};
