const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const path = require("path");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
	server: {
		port: 8088,
	},
	resolver: {
		extraNodeModules: {
			// Ensure React and React Native resolve from example to avoid duplicates
			react: path.resolve(__dirname, 'node_modules/react'),
			'react-native': path.resolve(__dirname, 'node_modules/react-native'),
			'@screeb/react-native': path.resolve(__dirname, '..'),
		},
	},
	watchFolders: [path.resolve(__dirname, '..')],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
