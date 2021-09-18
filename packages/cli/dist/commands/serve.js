"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
var path_1 = __importDefault(require("path"));
var commander_1 = require("commander");
var local_api_1 = require("local-api");
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'Port to run server on', '4005')
    .action(function (filename, options) {
    if (filename === void 0) { filename = 'notebook.js'; }
    var port = options.port;
    var parsedPort = Number.parseInt(port);
    var dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
    (0, local_api_1.serve)(parsedPort, path_1.default.basename(filename), dir);
});
