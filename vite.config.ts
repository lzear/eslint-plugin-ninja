/* eslint-disable unicorn/prefer-module */

// @ts-ignore
import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  build: {
    lib: {
      entry: [
        path.resolve(__dirname, 'configs/recommended.ts'),
        path.resolve(__dirname, 'configs/all.ts'),
        path.resolve(__dirname, 'index.ts'),
      ],
      fileName: (format, entryName) => {
        let directory = ''

        if (
          entryName.startsWith('recommended') ||
          entryName.startsWith('all')
        ) {
          directory = 'configs/'
        }

        return `${directory}${entryName}.${format === 'es' ? 'mjs' : 'js'}`
      },
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: (id: string) => !id.startsWith('.') && !path.isAbsolute(id),
    },
  },
})
