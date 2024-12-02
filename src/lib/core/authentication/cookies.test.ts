import { describe, expect, test, vi } from 'vitest';
import { deleteSessionTokenCookie, setSessionTokenCookie } from './cookies';

describe('Cookies service', () => {
	test('should set a cookie', () => {
		const event = {
			cookies: {
				set: vi.fn()
			}
		};
		//@ts-expect-error - this is enough for the test
		setSessionTokenCookie(event, 'token', new Date());
		expect(event.cookies.set).toHaveBeenCalledWith('session', 'token', {
			httpOnly: true,
			sameSite: 'lax',
			path: '/',
			expires: expect.any(Date)
		});
	});
	test('should delete a cookie', () => {
		const event = {
			cookies: {
				set: vi.fn()
			}
		};
		//@ts-expect-error - this is enough for the test
		deleteSessionTokenCookie(event);
		expect(event.cookies.set).toHaveBeenCalledWith('session', '', {
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 0,
			path: '/'
		});
	});
});
