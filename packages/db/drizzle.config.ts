import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'sqlite',
	driver: 'd1-http',
	schema: './src/schema/**/*schema.ts',
	casing: 'snake_case',
	out: './migrations',
	verbose: true,
	strict: true,
	dbCredentials: {
		accountId: 'c803c5d87e5620c5617743daaccd921d',
		databaseId: 'e23a31a4-f80a-4c1e-b7da-1ff74b8c4ce8',
		token: 'tTk8ZcsVg2eDuRd0PvYDJx4JkUNVAAmkT1sZeto0',
	},
});
