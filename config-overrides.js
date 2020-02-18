const { override, fixBabelImports, addLessLoader,addBabelPlugin } = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        // style: 'css'
        style: true,  //自定义主题
    }),
    addBabelPlugin('@babel/plugin-transform-async-to-generator'),
    
    //自定义主题
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
);