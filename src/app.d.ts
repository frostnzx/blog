// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace svelteHTML {
		interface IntrinsicElements {
			'model-viewer': {
				src?: string;
				alt?: string;
				style?: string;
				'camera-controls'?: boolean;
			};
		}
	}
}

export {};
