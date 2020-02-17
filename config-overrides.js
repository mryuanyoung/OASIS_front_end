const { override, fixBabelImports, addLessLoader,addBabelPlugins, useBabelRc } = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    ...addBabelPlugins('@babel/plugin-transform-async-to-generator', "@babel/plugin-transform-runtime"),
    useBabelRc(),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
);