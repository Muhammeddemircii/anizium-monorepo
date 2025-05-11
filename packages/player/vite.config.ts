import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [
    react(),
    mode === 'lib' &&
      dts({
        outDir: 'dist/lib',
        include: ['src'],
        exclude: ['**/*.test.ts', '**/*.test.tsx'],
        rollupTypes: true,
      }),
  ].filter(Boolean),
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    ...(mode === 'lib'
      ? {
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'AniziumPlayer',
            formats: ['es', 'umd'],
            fileName: (format) => `anizium-player.${format}.js`,
          },
          outDir: 'dist/lib',
          sourcemap: true,
          rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react/jsx-runtime': 'JSX',
              },
              inlineDynamicImports: false,
              format: 'es',
              exports: 'named',
              assetFileNames: (assetInfo) => {
                if (assetInfo.name === 'style.css') return 'player.css'
                return assetInfo.name
              },
            },
          },
        }
      : {
          outDir: 'dist/app',
          sourcemap: true,
          assetsInlineLimit: 0,
          rollupOptions: {
            input: {
              main: resolve(__dirname, 'index.html'),
            },
          },
        }),
    ...(command === 'build' && {
      minify: 'esbuild',
      esbuild: {
        drop: ['console'],
        pure: ['console.log'],
      },
    }),
  },
  watch:
    command === 'serve' || process.argv.includes('--watch')
      ? {
          include: 'src/**',
        }
      : null,
}))
