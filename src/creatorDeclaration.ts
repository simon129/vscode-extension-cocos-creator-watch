// https://github.com/Microsoft/vscode-go/blob/master/src/goDeclaration.ts
import * as vscode from 'vscode';
import { byteOffsetAt } from './util';

export class CreatorDeclaration implements vscode.DefinitionProvider {

	constructor() {
	}

	public provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.Location> {
		let filename = document.fileName;
		let lineText = document.lineAt(position.line).text;
		let lineTillCurrentPosition = lineText.substr(0, position.character);
		let wordRange = document.getWordRangeAtPosition(position);
		let word = wordRange ? document.getText(wordRange) : '';

		console.log(filename);
		console.log(lineText);
		console.log(lineTillCurrentPosition);
		console.log(wordRange);
		console.log(word);


		let definitionResource = vscode.Uri.file('');
		return Promise.resolve(new vscode.Location(document.uri, new vscode.Position(2, 0)));
		/*
		return definitionLocation(document, position, this.goConfig, false, token)
			.then(definitionInfo => {
				if (definitionInfo == null || definitionInfo.file == null) return null;
				let definitionResource = vscode.Uri.file(definitionInfo.file);
				let pos = new vscode.Position(definitionInfo.line, definitionInfo.column);
				return new vscode.Location(definitionResource, pos);
			}, err => {
				if (err) {
					// Prompt for missing tool is located here so that the
					// prompts dont show up on hover or signature help
					if (typeof err === 'string' && err.startsWith(missingToolMsg)) {
						promptForMissingTool(err.substr(missingToolMsg.length));
					} else {
						return Promise.reject(err);
					}
				}
				return Promise.resolve(null);
			});
	}*/
	}
}