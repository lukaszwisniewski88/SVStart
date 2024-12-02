import PrismaClient from '$lib/core/database/__mocks__/prisma';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import { SessionPrismaService } from './session';

describe('Session service', () => {
	let prismaClient: typeof PrismaClient;
	beforeAll(() => {
		vi.mock('$lib/core/database/prisma');
		prismaClient = PrismaClient;
	});
	test('should generate different tokens, unique across multiple uses', async () => {
		const sessionService = new SessionPrismaService(prismaClient);
		const tokens_gen = new Array(100).fill(0).map(() => sessionService.generateSessionToken());
		const tokens_set = new Set(tokens_gen);
		expect(tokens_gen.length).toBe(tokens_set.size);
	});
	test('should create a session, and save it to the database', async () => {
		const sessionService = new SessionPrismaService(prismaClient);
		prismaClient.session.create.mockResolvedValue({
			id: 'session_id',
			expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
			userId: 1
		});
		const session = await sessionService.createSession('test', 1);
		const called_args = prismaClient.session.create.mock.calls[0][0].data;
		expect(prismaClient.session.create).toHaveBeenCalledTimes(1);
		expect(called_args.id).not.toBe('test');
		expect(session.id).not.toBe('session_id');
	});
	test('validate session returns null when not such session', async () => {
		const sessionService = new SessionPrismaService(prismaClient);
		prismaClient.session.findUnique.mockResolvedValue(null);
		const result = await sessionService.validateSessionToken('test');
		expect(result.session).toBeNull();
		expect(result.user).toBeNull();
	});
	test('session exists but expired', async () => {
		const sessionService = new SessionPrismaService(prismaClient);
		prismaClient.session.findUnique.mockResolvedValue({
			id: 'session_id',
			expiresAt: new Date(Date.now() - 1000),
			userId: 1
		});
		const result = await sessionService.validateSessionToken('test');
		expect(result.session).toBeNull();
		expect(result.user).toBeNull();
	});
	test('session exists and is prolonged', async () => {
		const sessionService = new SessionPrismaService(prismaClient);
		prismaClient.session.findUnique.mockResolvedValue({
			id: 'session_id',
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
			userId: 1,
			// includes user
			// @ts-expect-error - here we are asking to join user
			user: {
				id: 1
			}
		});
		const result = await sessionService.validateSessionToken('test');
		expect(result.session).not.toBeNull();
		expect(result.user).not.toBeNull();
		console.log({ result });
		expect(prismaClient.session.update).toHaveBeenCalledTimes(1);
	});
	test('invalidate session', async () => {
		const sessionService = new SessionPrismaService(prismaClient);
		await sessionService.invalidateSession('test');
		expect(prismaClient.session.delete).toHaveBeenCalledTimes(1);
	});
});
