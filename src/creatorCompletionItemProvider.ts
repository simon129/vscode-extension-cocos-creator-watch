// https://github.com/Microsoft/vscode-go/blob/master/src/goSuggest.ts
import { Position, CancellationToken, CompletionItem, CompletionItemProvider, WorkspaceConfiguration, DocumentFilter, window, workspace, Disposable, ExtensionContext, TextDocument } from 'vscode';
import { byteOffsetAt } from './util';

export class CreatorCompletionItemProvider implements CompletionItemProvider {
	private _disposable: Disposable;

	constructor() {

	}

	public provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): Thenable<CompletionItem[]> {
		return this.provideCompletionItemsInternal(document, position, token, workspace.getConfiguration('go'));
	}

	private provideCompletionItemsInternal(document: TextDocument, position: Position, token: CancellationToken, config: WorkspaceConfiguration): Thenable<CompletionItem[]> {
		// console.log(document)
		// console.log(position);
		// console.log(token);

		let filename = document.fileName;
		let lineText = document.lineAt(position.line).text;
		let lineTillCurrentPosition = lineText.substr(0, position.character);
		console.log(filename);
		console.log(lineText);
		console.log(lineTillCurrentPosition);;
		return null;
	}

	public dispose() {
		this._disposable.dispose();
	}
}
