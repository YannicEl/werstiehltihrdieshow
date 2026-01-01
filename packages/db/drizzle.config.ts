import { defineConfig } from 'drizzle-kit';
import { loadEnvFile } from 'node:process';

loadEnvFile('./.env');

export default defineConfig({
	dialect: 'sqlite',
	driver: 'd1-http',
	schema: './src/schema/**/*schema.ts',
	casing: 'snake_case',
	out: './migrations',
	verbose: true,
	strict: true,
	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
		databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
		token: process.env.CLOUDFLARE_TOKEN_ID!,
	},
});
