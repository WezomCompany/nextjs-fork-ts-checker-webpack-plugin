import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

interface WebpackContext {
	isServer?: boolean;
	dev?: boolean;
}

interface WebpackConfig {
	plugins: any[];
}

interface InitOptions {
	verificationPhases: string[];
	phase: string;
	webpackContext: WebpackContext;
	tsConfigPath: string;
}

export class NextjsForkTsCheckerWebpackPlugin {
	protected readonly verificationPhases: string[];
	protected readonly phase: string;
	protected readonly webpackContext: WebpackContext;
	protected readonly tsConfigPath;

	constructor({
		verificationPhases,
		phase,
		webpackContext,
		tsConfigPath,
	}: InitOptions) {
		this.verificationPhases = verificationPhases;
		this.phase = phase;
		this.webpackContext = webpackContext;
		this.tsConfigPath = tsConfigPath;
	}

	protected get hasAcceptablePhase(): boolean {
		return this.verificationPhases.includes(this.phase);
	}

	protected get hasAcceptableWebpackContext(): boolean {
		return (
			this.webpackContext.isServer !== true &&
			this.webpackContext.dev === true
		);
	}

	patch(config: WebpackConfig): void {
		if (this.hasAcceptablePhase && this.hasAcceptableWebpackContext) {
			config.plugins.push(
				new ForkTsCheckerWebpackPlugin({
					formatter: 'codeframe',
					typescript: {
						configFile: this.tsConfigPath,
					},
				})
			);
		}
	}
}
