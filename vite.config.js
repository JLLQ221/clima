import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: 'public', // Define el directorio de salida como `public`
        emptyOutDir: false, // Evita que el directorio `public` se limpie automáticamente
    },
    server: {
        watch: {
            // Asegúrate de que Vite esté observando solo los archivos necesarios
            ignored: ['public/**'], // Ignora los archivos en `public` en modo desarrollo
        },
    },
});