import * as vscode from "vscode";
import * as path from "path";
import { readHtml } from "./utils";

const createPanel = async (context: vscode.ExtensionContext) => {
  const panel = vscode.window.createWebviewPanel(
    "textToImage",
    "Capture Code",
    { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
    {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.file(context.extensionPath)],
    }
  );

  panel.webview.html = await readHtml(
    path.resolve(context.extensionPath, "webview/index.html"),
    panel
  );

  return panel;
};

const runCommand = async (context: vscode.ExtensionContext) => {
  let editor = vscode.window.activeTextEditor;
  if(!editor) return null
  let selection = editor.selection;
  let languageId = editor.document.languageId;
  let text = editor.document.getText(selection);
  
  const panel = await createPanel(context);

  panel.webview.postMessage({ command: "createImage", text: text, languageId });


  vscode.window.onDidChangeTextEditorSelection((event) => {
    if (event.textEditor === editor) {
      let newText = event.textEditor.document.getText(event.selections[0]);
      panel.webview.postMessage({ command: "createImage", text: newText, languageId });
    }
  });

  panel.webview.onDidReceiveMessage((message) => {
    if (message.command === "openExternalUrl") {
      vscode.env.openExternal(vscode.Uri.parse(message.url));
    }
  });
  
};

export const activate = (context: vscode.ExtensionContext) => {
  let disposable = vscode.commands.registerCommand(
    "capture-code.captureText",
    () => runCommand(context)
  );

  context.subscriptions.push(disposable);
};

export function deactivate() {}
