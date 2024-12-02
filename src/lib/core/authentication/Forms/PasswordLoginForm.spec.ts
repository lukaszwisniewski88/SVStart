// @vitest-environment jsdom
import { render } from '@testing-library/svelte';
import PasswordLoginForm from './PasswordLoginForm.svelte';
import { describe, test, expect } from 'vitest';
import { getForm } from './passwordLogin.form';

describe('Login Form Component', () => {
	test('should render the login form', async () => {
		const component = render(PasswordLoginForm, {
			target: document.body,
			props: {
				formData: await getForm()
			}
		});
		console.log(component);
		const form = document.querySelector('form');
		expect(form).not.toBeNull();
	});
});
