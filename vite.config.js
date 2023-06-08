import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    // project related config
    plugins: [
        // plugins
    ],
    server: {
        host: true,
        port: 3333 // change port number if you prefer
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                start: resolve(__dirname, 'start.html'),
                score: resolve(__dirname, 'score.html')
            }
        }
    }
});
