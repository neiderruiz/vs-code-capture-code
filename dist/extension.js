(()=>{"use strict";var e={112:function(e,t,i){var r=this&&this.__createBinding||(Object.create?function(e,t,i,r){void 0===r&&(r=i);var o=Object.getOwnPropertyDescriptor(t,i);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[i]}}),Object.defineProperty(e,r,o)}:function(e,t,i,r){void 0===r&&(r=i),e[r]=t[i]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&r(t,e,i);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.deactivate=t.activate=void 0;const n=s(i(496)),a=i(17),c=i(147);t.activate=function(e){let t=n.commands.registerCommand("capture-code.captureText",(()=>{let t=n.window.activeTextEditor;if(t){let i=t.selection,r=t.document.getText(i);const o=n.window.createWebviewPanel("textToImage","Text to Image",n.ViewColumn.Two,{enableScripts:!0});n.window.onDidChangeTextEditorSelection((e=>{if(e.textEditor===t){let t=e.textEditor.document.getText(e.selections[0]);o.webview.postMessage({command:"createImage",text:t})}}));const s=n.Uri.file(a.join(e.extensionPath,"src","script.js")),l=o.webview.asWebviewUri(s),d=n.Uri.file(a.join(e.extensionPath,"node_modules","dom-to-image-even-more","dist","dom-to-image-more.min.js")),u=o.webview.asWebviewUri(d),m=n.Uri.file(a.join(e.extensionPath,"node_modules","prismjs","prism.js")),p=o.webview.asWebviewUri(m),v=n.Uri.file(a.join(e.extensionPath,"node_modules","prismjs","themes","prism-tomorrow.css")),w=o.webview.asWebviewUri(v),f=n.Uri.file(a.join(e.extensionPath,"src","style.css")),b=o.webview.asWebviewUri(f),x=a.join(e.extensionPath,"src","index.html");let j=c.readFileSync(x,"utf-8");j=j.replace("${styleUriPrismjs}",w),j=j.replace("${myStyleUri}",b),j=j.replace("${domtoImageUri}",u),j=j.replace("${scriptUriPrismjs}",p),j=j.replace("${scriptUri}",l),o.webview.html=j,o.webview.postMessage({command:"createImage",text:r})}}));e.subscriptions.push(t)},t.deactivate=function(){}},496:e=>{e.exports=require("vscode")},147:e=>{e.exports=require("fs")},17:e=>{e.exports=require("path")}},t={},i=function i(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={exports:{}};return e[r].call(s.exports,s,s.exports,i),s.exports}(112);module.exports=i})();