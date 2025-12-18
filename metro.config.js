const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const resolver = require('metro-resolver');

// Root directory of the monorepo
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro look for modules in both the app-level and monorepo-level node_modules
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Force Metro to resolve modules from the workspace root (helpful for hoisting issues)
config.resolver.disableHierarchicalLookup = true;

/**
 * Standardized Resolve Request
 * This function handles redirects (mocks) and ensures proper fallback to the default resolver.
 * It avoids infinite recursion by checking the origin module path and using the metro-resolver directly.
 */
config.resolver.resolveRequest = (context, moduleName, platform) => {
    // Web-specific overrides
    if (platform === 'web') {
        if (moduleName === 'react-native-maps') {
            return {
                filePath: path.resolve(workspaceRoot, 'apps/zomato-customer-app/src/mocks/react-native-maps.web.js'),
                type: 'sourceFile',
            };
        }
    }

    // --- Shared Dependencies / Workspace Handling ---
    // Ensure that 'react', 'react-native', etc. resolve to the same instance (the one in workspace root)
    const sharedDeps = ['react', 'react-native', 'react-native-svg', 'react-native-reanimated', 'react-native-gesture-handler'];
    if (sharedDeps.includes(moduleName)) {
        return {
            filePath: require.resolve(moduleName, { paths: [workspaceRoot] }),
            type: 'sourceFile',
        };
    }

    // --- Fallback Resolver ---
    // Use metro-resolver directly to avoid recursion issues with context.resolveRequest
    return resolver.resolve(context, moduleName, platform);
};

// 4. Transform options
config.transformer.getTransformOptions = async () => ({
    transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
    },
});

module.exports = config;
