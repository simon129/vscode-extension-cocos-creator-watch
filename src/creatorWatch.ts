import { Disposable, workspace, window, TextDocument } from 'vscode';

let debounce = require('lodash.debounce');

import * as http from 'http';
import * as path from 'path';

export class CreatorWatch {
	private _update: Function
	private _disposable: Disposable;

	constructor() {
		var configuration = workspace.getConfiguration('creator.watch');

		var enabled = configuration.get('enabled')
		var port = configuration.get('port');
		var threshold = configuration.get('threshold');

		workspace.onDidChangeConfiguration(_ => {
			configuration = workspace.getConfiguration('creator.watch');
			enabled = configuration.get('enabled')
			port = configuration.get('port');
			threshold = configuration.get('threshold');
		});

		this._update = debounce(() => {
			if (!enabled) { return; }

			http.get(`http://localhost:${port}/update-db`, (res) => {
			}).on('error', error => {
				window.showErrorMessage('[Cocos Creator Watch] creator 無回應, port:' + port + ', error:' + error.message);
			});

			console.log('update-db');
		}, threshold);

		let subscriptions: Disposable[] = [];

		workspace.onDidSaveTextDocument(this._onDidSaveTextDocument, this, subscriptions);

		this._disposable = Disposable.from(...subscriptions);
	}

	private _onDidSaveTextDocument(document: TextDocument) {
		// *.js
		if (document.languageId === "javascript") {
			// assets folder
			var relative = path.relative(workspace.rootPath, document.fileName);
			if (relative.split(path.sep)[0] === 'assets') {
				this._update();
			}
		}
	}

	public dispose() {
		this._disposable.dispose();
	}
}