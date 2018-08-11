//@ts-check

'use strict';

const fs = require('fs');
const path = require('path');

const HyperText = require('./libs/hypertext');
const Manifest = require('./libs/assets-manifest');

module.exports = { main: main };


function help() {
	const pkg = getPackage();
	HyperText.log([
		``,
		`  <b>Usage</b>: ${pkg.name} [...options] [...names]`,
		``,
		`  <b>Options</b>:`,
		``,
		`    -f, --force             <dim>force overwrite file</dim>`,
		`    -l, --list, list        <dim>list available file names</dim>`,
		`    -h, --help, help        <dim>help info</dim>`,
		`    -V, --version, version  <dim>version info</dim>`,
		``
	]);
}

/** @param {string[]} args */
function main(args) {
	let force = false;

	//#region parse argument
	const argsMap = {};
	args.forEach(it => argsMap[it] = it);

	if (args[0] === 'completion') return console.log(fs.readFileSync(path.join(__dirname, 'libs', 'bash-completion.sh'), 'utf8'));
	if (argsMap['--complete-list']) return console.log(Manifest.files.map(it => it.name).join(' '));
	if (argsMap['--complete-opts']) return console.log('-h --help -l --list -V --version -f --force');

	if (args.length === 0 || argsMap['help'] || argsMap['-h'] || argsMap['--help'])
		return help();
	if (argsMap['list'] || argsMap['-l'] || argsMap['--list'])
		return list();
	if (argsMap['version'] || argsMap['-V'] || argsMap['--version'])
		return version();
	if (argsMap['-f'] || argsMap['--force'])
		force = true;
	//#endregion

	//#region filter file names from arguments
	const files = args
		.filter(it => !it.startsWith('-'))
		.filter(it => it != 'help' && it != 'list');
	if (files.length === 0)
		return help();
	//#endregion

	/** @type {AssetManifestFileMap} */
	const availableFiles = {};
	Manifest.files.forEach(it => availableFiles[toCommonName(it.name)] = it)

	//#region check are names existed
	let existed = true;
	const commonFiles = files.map(toCommonName);
	commonFiles.forEach((it, index) => {
		if (!(it in availableFiles)) {
			const originalName = files[index];
			HyperText.log(`  <red><b>error</b>  "${originalName}" is not existed!</red>`);
			existed = false;
		}
	});
	if (!existed) {
		HyperText.log(`  <b>Available Files:</b>`);
		HyperText.log('    ' + Manifest.files.map(it => it.name).join(', '));
		return process.exit(1);
	}
	//#endregion


	//#region check are target file duplicated and existed
	/** @type {{[name: string]: AssetManifestFile[];}} */
	const targetFileMap = {};
	commonFiles.forEach((_) => {
		const it = availableFiles[_];
		if (!(it.target in targetFileMap))
			targetFileMap[it.target] = [];
		targetFileMap[it.target].push(it);
	});
	let targetFileError = false;
	Object.keys(targetFileMap).forEach(targetFile => {
		const items = targetFileMap[targetFile];
		if (items.length > 1) {
			HyperText.log(`  <red><b>error</b>  target file "${targetFile}" is duplicated! (${
				items.map(item => item.name).join(', ')})</red>`);
			targetFileError = true;
		} else if (fs.existsSync(targetFile)) {
			if (force) {
				HyperText.log(`  <yellow>warn    overwrite existed file "${targetFile}"</yellow>`);
			} else {
				HyperText.log(`  <red><b>error</b>  "${targetFile}" is existed! (use option --force to overwrite it)</red>`);
				targetFileError = true;
			}
		}
	});
	if (targetFileError)
		return process.exit(1);
	//#endregion


	//#region write file
	Object.keys(targetFileMap).forEach(targetFile => {
		const item = targetFileMap[targetFile][0];
		const absTarget = path.join(process.cwd(), targetFile);
		fs.copyFileSync(path.join(__dirname, 'assets', item.file), absTarget);
		HyperText.log(`  <green><b>success</b> ${item.name} => <dim>${absTarget}</dim></green>`)
	});
	//#endregion
}

function version() {
	const pkg = getPackage();
	console.log(pkg.version);
}

function list() {
	const items = Manifest.files.map(it =>
		`    <b>${it.name}</b> ${it.file}\n    <dim>└─ ${it.desc}</dim>`);

	HyperText.log('\n<b>  Files:</b>\n');
	HyperText.log(items);
	HyperText.log('');
}

function getPackage() {
	return JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
}


/** @param {string} name */
function toCommonName(name) {
	return name.toLowerCase().replace(/\W/g, '');
}
