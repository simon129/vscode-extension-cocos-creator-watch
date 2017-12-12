import { ExtensionContext, workspace, DocumentFilter } from 'vscode';

import * as path from 'path';
import * as fs from 'fs';

import { CreatorCompletionItemProvider } from './CreatorCompletionItemProvider'
import { CreatorDeclaration } from './creatorDeclaration'
import { CreatorWatch } from './creatorWatch'

export function activate(ctx: ExtensionContext) {

    try {
        var cocosProjectJson = path.resolve(workspace.rootPath, 'project.json');
        var json = JSON.parse(fs.readFileSync(cocosProjectJson, 'utf8'));
    } catch (e) { }

    const JS_MODE: DocumentFilter = {
        language: 'javascript',
        scheme: 'file',
    };

    if (json && json.engine === 'cocos2d-html5') {
        //ctx.subscriptions.push(languages.registerCompletionItemProvider(JS_MODE, new CreatorCompletionItemProvider(), '.'));
        //ctx.subscriptions.push(languages.registerDefinitionProvider(JS_MODE, new CreatorDeclaration()));
        ctx.subscriptions.push(new CreatorWatch());
    }
}

export function deactivate() {
}