import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	// @ts-expect-error - Vite config
	plugins: [enhancedImages(), sveltekit(), svelteTesting()],

	resolve: process.env.VITEST
		? {
				conditions: ['browser', 'svelte']
			}
		: undefined,
	test: {
		deps: {
			interopDefault: false
		},
		setupFiles: ['./vitest-setup.js'],
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		coverage: {
			exclude: [
				'coverage/**',
				'**/node_modules/**',
				'**/[.]**',
				'packages/*/test?(s)/**',
				'**/*.d.ts',
				'**/virtual:*',
				'**/__x00__*',
				'**/\x00*',
				'cypress/**',
				'test?(s)/**',
				'test?(-*).?(c|m)[jt]s?(x)',
				'**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)',
				'**/__tests__/**',
				'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
				'**/vitest.{workspace,projects}.[jt]s?(on)',
				'**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
				'src/routes/**',
				'.svelte-kit/**',
				'build/**',
				'**/*.config.ts',
				'**/*.config.js',
				'src/hooks.server.ts'
			]
		}
	}
});
