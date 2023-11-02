import * as vscode from "vscode";
const path = require("path");
const fs = require("fs");

export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands.registerCommand(
    "capture-code.captureText",
    () => {
      let editor = vscode.window.activeTextEditor;
      if (editor) {
        let selection = editor.selection;
        let text = editor.document.getText(selection);

		const panel = vscode.window.createWebviewPanel(
          "textToImage",
          "Text to Image", 
          vscode.ViewColumn.Two,
          {
            enableScripts: true,
          }
        );

		vscode.window.onDidChangeTextEditorSelection((event) => {
			if (event.textEditor === editor) { 
			  let newText = event.textEditor.document.getText(event.selections[0]);
			  panel.webview.postMessage({ command: "createImage", text: newText });
			}
		  });
		  

        const scriptPathOnDisk = vscode.Uri.file(
          path.join(context.extensionPath, "src", "script.js")
        );
        const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);

        const domtoImageUrl = vscode.Uri.file(
          path.join(
            context.extensionPath,
            "node_modules",
            "dom-to-image-even-more",
            "dist",
            "dom-to-image-more.min.js"
          )
        );

        const domtoImageUri = panel.webview.asWebviewUri(domtoImageUrl);

        const scriptPathcPrismjs = vscode.Uri.file(
          path.join(
            context.extensionPath,
            "node_modules",
            "prismjs",
            "prism.js"
          )
        );

        const scriptUriPrismjs = panel.webview.asWebviewUri(scriptPathcPrismjs);

        const stylePathcPrismjs = vscode.Uri.file(
          path.join(
            context.extensionPath,
            "node_modules",
            "prismjs",
            "themes",
            "prism-tomorrow.css"
          )
        );

        const styleUriPrismjs = panel.webview.asWebviewUri(stylePathcPrismjs);

        const myStylePath = vscode.Uri.file(
          path.join(context.extensionPath, "src", "style.css")
        );

        const myStyleUri = panel.webview.asWebviewUri(myStylePath);


        const filePath = path.join(context.extensionPath, "src", "index.html");

        const htmlFile = fs.readFileSync(filePath, "utf-8");

        let updatedHtml = htmlFile;
        updatedHtml = updatedHtml.replace(
          "${styleUriPrismjs}",
          styleUriPrismjs
        );
        updatedHtml = updatedHtml.replace("${myStyleUri}", myStyleUri);
        updatedHtml = updatedHtml.replace("${domtoImageUri}", domtoImageUri);
        updatedHtml = updatedHtml.replace(
          "${scriptUriPrismjs}",
          scriptUriPrismjs
        );

        updatedHtml = updatedHtml.replace("${scriptUri}", scriptUri);

        panel.webview.html = updatedHtml;

        panel.webview.postMessage({ command: "createImage", text: text });


      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
