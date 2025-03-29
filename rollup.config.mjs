import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';

const outputDir = 'dist';

export default {
    input: 'src/index.ts', // Your entry point file
    output: [
        {
            file: `${outputDir}/index.js`,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: `${outputDir}/index.mjs`,
            format: 'esm',
            sourcemap: true,
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        json(),
        typescript({
            tsconfig: './tsconfig.json'
        }),
        terser(),
        copy({
            targets: [
                { src: 'data/*.json', dest: `${outputDir}/data` }
            ],
            verbose: true
        })
    ],
    external: [
        'fs', 'path', 'url', 'zod', 'pathe', 'cac', 'consola', 'deepmerge', 'linkedom',
        'picocolors', 'playwright', 'stylis', '@octokit/core', '@evan/concurrency', 'magic-string'
    ]
};
