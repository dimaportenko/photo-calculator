const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Fix for reanimated fabric/new architecture issue
// https://github.com/software-mansion/react-native-reanimated/issues/5455#issuecomment-1847650606
config.transformer = config.transformer || {};
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = withNativeWind(config, { input: "./app/global.css" }); // Learn more https://docs.expo.io/guides/customizing-metro
