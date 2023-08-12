import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { describe, expect, it } from 'vitest';
import { NextjsForkTsCheckerWebpackPlugin } from '../NextjsForkTsCheckerWebpackPlugin';

describe('WebpackTsChecker', () => {
	it('if `verificationPhases` includes `phase` should not add ForkTsCheckerWebpackPlugin to config.plugins', () => {
		const tsChecker = new NextjsForkTsCheckerWebpackPlugin({
			verificationPhases: ['phase1', 'phase2'],
			phase: 'phase2',
			webpackContext: { isServer: false, dev: true },
			tsConfigPath: './tsconfig.json',
		});

		const config = { plugins: [] };
		tsChecker.patch(config);

		expect(config.plugins).toHaveLength(1);
		expect(config.plugins[0]).toBeInstanceOf(ForkTsCheckerWebpackPlugin);
	});

	it('if `verificationPhases` not includes `phase` then should not add ForkTsCheckerWebpackPlugin to config.plugins', () => {
		const tsChecker = new NextjsForkTsCheckerWebpackPlugin({
			verificationPhases: ['phase1', 'phase2'],
			phase: 'phase3',
			webpackContext: { isServer: false, dev: true },
			tsConfigPath: './tsconfig.json',
		});

		const config = { plugins: [] };
		tsChecker.patch(config);

		expect(config.plugins).toHaveLength(0);
	});

	it('if `webpackContext.isServer` is true then should not add ForkTsCheckerWebpackPlugin to config.plugins', () => {
		const tsChecker = new NextjsForkTsCheckerWebpackPlugin({
			verificationPhases: ['phase1', 'phase2'],
			phase: 'phase2',
			webpackContext: { isServer: true, dev: true },
			tsConfigPath: './tsconfig.json',
		});

		const config = { plugins: [] };
		tsChecker.patch(config);

		expect(config.plugins).toHaveLength(0);
	});

	it('if `webpackContext.dev` is false then should not add ForkTsCheckerWebpackPlugin to config.plugins', () => {
		const tsChecker = new NextjsForkTsCheckerWebpackPlugin({
			verificationPhases: ['phase1', 'phase2'],
			phase: 'phase2',
			webpackContext: { isServer: false, dev: false },
			tsConfigPath: './tsconfig.json',
		});

		const config = { plugins: [] };
		tsChecker.patch(config);

		expect(config.plugins).toHaveLength(0);
	});
});
