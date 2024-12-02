import type { Session, User } from '@prisma/client';

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };

export interface SessionService {
	generateSessionToken: () => string;
	createSession: (session_token: string, user_id: User['id']) => Promise<Session>;
	validateSessionToken: (session_token: string) => Promise<SessionValidationResult>;
	invalidateSession: (session_id: string) => Promise<void>;
}
