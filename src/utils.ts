import * as vscode from "vscode";
import * as path from "path";
// const { readFile, writeFile } = require('fs').promises;
import { readFile, writeFile } from "fs/promises";

export const readHtml = async (htmlPath: any, panel: any) =>
  (await readFile(htmlPath, "utf-8"))
    .replace(/%CSP_SOURCE%/gu, panel.webview.cspSource)
    .replace(
      /(src|href)="([^"]*)"/gu,
      (_, type, src) =>
        `${type}="${panel.webview.asWebviewUri(
          vscode.Uri.file(path.resolve(htmlPath, "..", src))
        )}"`
    );
