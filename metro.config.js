// I commented out the following because this caused an error where the program can't find a file that actually exists. You will see the problem if you put it back.

// const { getDefaultConfig } = require('metro-config');

// module.exports = (async () => {
//     const {
//         resolver: { sourceExts, assetExts },
//     } = await getDefaultConfig();
//     return {
//         transformer: {
//             babelTransformerPath: require.resolve('react-native-svg-transformer'),
//         },
//         resolver: {
//             assetExts: assetExts.filter((ext) => ext !== 'svg'),
//             sourceExts: [...sourceExts, 'svg'],
//         },
//     };
// })();
