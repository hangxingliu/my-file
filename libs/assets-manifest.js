//@ts-check
/// <reference path="../types.d.ts" />

'use strict';

/** @type {AssetManifest} */
const Manifest = {
	files: [
		{
			name: 'editorconfig',
			file: 'editorconfig',
			target: '.editorconfig',
			desc: 'Basic EditorConfig config'
		},
		{
			name: 'gpl3',
			file: 'GPL3.LICENSE',
			target: 'LICENSE',
			desc: 'GPL-3.0 license file'
		},
		{
			name: 'node-travis',
			file: 'node.travis.yml',
			target: '.travis.yml',
			desc: 'Basic travis-ci config file for Node.js'
		},
		{
			name: 'node-gitignore',
			file: 'node.gitignore',
			target: '.gitignore',
			desc: 'Git ignore list for Node.js'
		},
	]
};
module.exports = Manifest;
