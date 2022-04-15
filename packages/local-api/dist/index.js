"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const serve = (port, filename, dir) => {
    const app = (0, express_1.default)();
    const packagePath = require.resolve('local-package/build/index.html');
    console.log(packagePath);
    app.use(express_1.default.static(path_1.default.dirname(packagePath)));
    // app.use(express.static('../../local-package/build'))
    // app.use(
    //   createProxyMiddleware('', {
    //     target: 'http://localhost:3000/react-typescript-jbookApp',
    //     ws: true,
    //     logLevel: 'debug',
    //     changeOrigin: true,
    //   }),
    // )
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
