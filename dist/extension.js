/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(__webpack_require__(1));
const path = __webpack_require__(2);
const fs = __webpack_require__(3);
function activate(context) {
    let disposable = vscode.commands.registerCommand("capture-code.captureText", () => {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            let selection = editor.selection;
            let text = editor.document.getText(selection);
            const panel = vscode.window.createWebviewPanel("textToImage", "Text to Image", vscode.ViewColumn.Two, {
                enableScripts: true,
            });
            vscode.window.onDidChangeTextEditorSelection((event) => {
                if (event.textEditor === editor) {
                    let newText = event.textEditor.document.getText(event.selections[0]);
                    panel.webview.postMessage({ command: "createImage", text: newText });
                }
            });
            const scriptPathOnDisk = vscode.Uri.file(path.join(context.extensionPath, "src", "script.js"));
            const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);
            const domtoImageUrl = vscode.Uri.file(path.join(context.extensionPath, "node_modules", "dom-to-image-even-more", "dist", "dom-to-image-more.min.js"));
            const domtoImageUri = panel.webview.asWebviewUri(domtoImageUrl);
            const scriptPathcPrismjs = vscode.Uri.file(path.join(context.extensionPath, "node_modules", "prismjs", "prism.js"));
            const scriptUriPrismjs = panel.webview.asWebviewUri(scriptPathcPrismjs);
            const stylePathcPrismjs = vscode.Uri.file(path.join(context.extensionPath, "node_modules", "prismjs", "themes", "prism-tomorrow.css"));
            const styleUriPrismjs = panel.webview.asWebviewUri(stylePathcPrismjs);
            const myStylePath = vscode.Uri.file(path.join(context.extensionPath, "src", "style.css"));
            const myStyleUri = panel.webview.asWebviewUri(myStylePath);
            const filePath = path.join(context.extensionPath, "src", "index.html");
            const htmlFile = fs.readFileSync(filePath, "utf-8");
            let updatedHtml = htmlFile;
            updatedHtml = updatedHtml.replace("${styleUriPrismjs}", styleUriPrismjs);
            updatedHtml = updatedHtml.replace("${myStyleUri}", myStyleUri);
            updatedHtml = updatedHtml.replace("${domtoImageUri}", domtoImageUri);
            updatedHtml = updatedHtml.replace("${scriptUriPrismjs}", scriptUriPrismjs);
            updatedHtml = updatedHtml.replace("${scriptUri}", scriptUri);
            panel.webview.html = updatedHtml;
            panel.webview.postMessage({ command: "createImage", text: text });
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map