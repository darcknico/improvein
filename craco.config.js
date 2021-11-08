const path = require('path');
const CracoAlias = require("craco-alias");

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "tsconfig",
                baseUrl: "./src",
                tsConfigPath: "./tsconfig.extend.json"
            }
        }
    ],
    /*
    webpack: {
        alias: {
            '@app': path.resolve(__dirname, './src/'),
            '@api': path.resolve(__dirname, './src/api/'),
            '@pages': path.resolve(__dirname, './src/pages/'),
            '@models': path.resolve(__dirname, './src/models/'),
        }
    }
    */
};
