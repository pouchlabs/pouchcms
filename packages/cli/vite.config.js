import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import {handler} from "@pouchcms/cms/handler"
export default defineConfig({
	plugins: [sveltekit(),
		{
			name:"v",
			configureServer:(server)=>{
				
			server.middlewares.use(handler)
			
			 
			},
			configurePreviewServer:(server)=>{
				server.middlewares.use(handler)
				}
		   }
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
