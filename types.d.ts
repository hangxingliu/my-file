/// <reference path="./node.d.ts" />

type AssetManifestFile = {
	name: string;
	file: string;
	target: string;
	desc: string;
};

type AssetManifest = {
	files: ManifestFile[];
};

type AssetManifestFileMap = {
	[name: string]: AssetManifestFile;
};
