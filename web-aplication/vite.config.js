import { defineConfig } from 'vite';
import {resolve} from "path"
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'

const root = resolve(__dirname,"resources/js")

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
    ],
    base:"/",
    resolve:{
        alias:{
            "@":resolve(root,"Components"),
            "@utils":resolve(root,"utils"),
            "@js":root,
        }
    }
});
