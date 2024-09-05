"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extra_typings_1 = require("@commander-js/extra-typings");
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const program = new extra_typings_1.Command();
program
    .command("build-page")
    .description("Build a page")
    .argument("<file>", ".mdx file to compile")
    .requiredOption("-o, --outDir <outDir>", "Output directory")
    .action((file, option) => __awaiter(void 0, void 0, void 0, function* () {
    const originalPath = path_1.default.resolve(path_1.default.join(process.cwd(), "../../", file));
    const targetPath = path_1.default.resolve(path_1.default.join(process.cwd(), "../../", ".page-lib/page-build-template/src/Page.mdx"));
    yield (0, fs_1.copyFileSync)(originalPath, targetPath);
    yield (0, child_process_1.exec)(`yarn workspace @usemorph/page-build-template build --outDir ../../${option.outDir}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}));
program.parse();
