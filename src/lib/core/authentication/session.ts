import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import type { SessionService } from './interfaces';
import type { Session } from '@prisma/client';
import { sha256 } from '@oslojs/crypto/sha2';
import type { PrismaClient } from '@prisma/client';

export class SessionPrismaService implements SessionService {
	constructor(private prisma: PrismaClient) {}
	generateSessionToken(): string {
		const bytes = new Uint8Array(20);
		crypto.getRandomValues(bytes);
		const token = encodeBase32LowerCaseNoPadding(bytes);
		return token;
	}
	async createSession(session_token: string, user_id: number) {
		const session_id = encodeHexLowerCase(sha256(new TextEncoder().encode(session_token)));
		const session: Session = {
			id: session_id,
			expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
			userId: user_id
		};
		await this.prisma.session.create({ data: session });
		return session;
	}
	async validateSessionToken(session_token: string) {
		const session_id = encodeHexLowerCase(sha256(new TextEncoder().encode(session_token)));
		const session_result = await this.prisma.session.findUnique({
			where: { id: session_id },
			include: { user: true }
		});
		if (session_result === null) {
			return { session: null, user: null };
		}
		const { user, ...session } = session_result;
		if (Date.now() >= session.expiresAt.getTime()) {
			await this.prisma.session.delete({ where: { id: session_id } });
			return { session: null, user: null };
		}
		if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
			session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
			await this.prisma.session.update({
				where: { id: session_id },
				data: { expiresAt: session.expiresAt }
			});
		}
		return { session, user };
	}
	async invalidateSession(session_id: string) {
		await this.prisma.session.delete({ where: { id: session_id } });
	}
}
