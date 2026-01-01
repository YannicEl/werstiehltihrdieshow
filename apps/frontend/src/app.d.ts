import type { SvelteKitAuth } from '@werstiehltihrdieshow/auth/svelteKit';
import type { DB } from '@werstiehltihrdieshow/db/client';
import 'unplugin-icons/types/svelte';
import type { Session } from './lib/server/auth';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: DB;
			auth: SvelteKitAuth;
			session: Session;
		}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: Env;
			context: ExecutionContext;
			caches: CacheStorage;
			cf?: RequestInitCfProperties;
		}
	}
}

export {};
