import {
	deleteSessionTokenCookie,
	SESSION_COOKIE_NAME,
	setSessionTokenCookie
} from '$lib/core/authentication/cookies';
import { SessionPrismaService } from '$lib/core/authentication/session';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(SESSION_COOKIE_NAME) ?? null;
	if (!token) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const sessionService = new SessionPrismaService();
	const { session, user } = await sessionService.validateSessionToken(token);
	if (session !== null) {
		setSessionTokenCookie(event, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}
	event.locals.user = user;
	event.locals.session = session;
	return await resolve(event);
};
