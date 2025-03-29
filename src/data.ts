import * as fs from 'node:fs';
import {createRequire} from 'module';
import type {
	APIIconResponse,
	APIResponse,
	APIVfResponse,
	AxesObject,
	FontObjectV1,
	FontObjectV2,
	FontObjectV2Hybrid,
	FontObjectVariable,
	FontObjectVariableDirect,
	Licenses,
} from './types';

const require = createRequire(import.meta.url);

// Helper function to read files via require.resolve()
const readJSON = (relativePath: string): any | null => {
	try {
		const filePath = require.resolve(`google-font-metadata/data/${relativePath}`);
		const fileContents = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(fileContents);
	} catch (error) {
		if (error instanceof Error) { // Type guard to ensure TypeScript understands the error type
			console.warn(`Could not load ${relativePath}:`, error.message);
		} else {
			console.warn(`Could not load ${relativePath}:`, String(error));
		}
		return null;
	}
}

// Load all JSON files

/**
 * This returns a version of the Google Fonts Developer API.
 * {@link https://developers.google.com/fonts/docs/developer_api}
 */
const APIDirect = readJSON('api-response.json') as APIResponse[];

/**
 * This returns a version of the Google Fonts Developer API with axes for variable fonts.
 * {@link https://developers.google.com/fonts/docs/developer_api}
 */
const APIVFDirect = readJSON('api-response-variable.json') as APIVfResponse[];

/**
 * This returns a parsed version of the Google Fonts CSS API (v1) for all Google Fonts.
 * {@link https://developers.google.com/fonts/docs/getting_started}
 */
const APIv1 = readJSON('google-fonts-v1.json') as FontObjectV1;

/**
 * This returns a parsed version of the Google Fonts CSS API (v2) for all Google Fonts.
 * {@link https://developers.google.com/fonts/docs/css2}
 */
const APIv2 = readJSON('google-fonts-v2.json') as FontObjectV2;;

/**
 * This returns a parsed hybrid (normal and vf fonts) version of the Google Fonts CSS API (v2) for all Google Fonts.
 * {@link https://developers.google.com/fonts/docs/css2}
 */
const APIv2Hybrid = readJSON('google-fonts-v2-hybrid.json') as FontObjectV2Hybrid;;
/**
 * This returns a response from the Google Fonts API for all icons.
 * {@link https://fonts.google.com/icons}
 */
const APIIconDirect = readJSON('icons-response.json') as APIIconResponse[];;

/**
 * This returns a parsed version of the Google Fonts API for icons using the CSS API v2.
 * {@link https://fonts.google.com/icons}
 */
const APIIconStatic = readJSON('icons-static.json') as FontObjectV2;;

/**
 * This returns a parsed version of the Google Fonts API for icons that are variable.
 * {@link https://fonts.google.com/icons}
 */
const APIIconVariable = readJSON('icons-variable.json') as FontObjectVariable;;

/**
 * This returns a scraped version of the Google Fonts Variable Fonts page.
 * {@link https://fonts.google.com/variablefonts}
 */
const APIVariableDirect = readJSON('variable-response.json') as FontObjectVariableDirect[];;

/**
 * This returns a parsed version of the Google Fonts CSS API (Variable) for all Google Fonts.
 * {@link https://fonts.google.com/variablefonts}
 */
const APIVariable = readJSON('variable.json') as FontObjectVariable;;

/**
 * This returns a parsed version of the Google Fonts Attribution page.
 * {@link https://fonts.google.com/attribution}
 */
const APILicense = readJSON('licenses.json') as Licenses;;

/**
 * This returns the axis registry of the supported Google Font variable axes.
 * {@link https://github.com/googlefonts/axisregistry}
 */
const APIRegistry = readJSON('axis-registry.json') as AxesObject[];;

export {
	APIDirect,
	APIVFDirect,
	APIIconDirect,
	APIIconStatic,
	APIIconVariable,
	APILicense,
	APIRegistry,
	APIv1,
	APIv2,
	APIv2Hybrid,
	APIVariable,
	APIVariableDirect,
};
