import { ExtensionContext, workspace, DocumentFilter } from 'vscode';

import * as path from 'path';
import * as fs from 'fs';

import { CreatorWatch } from './creatorWatch'
import { isCocosCreatorProjectFolder } from './util';

export function activate(ctx: ExtensionContext) {
    if (isCocosCreatorProjectFolder()) {
        ctx.subscriptions.push(new CreatorWatch());
    }
}

export function deactivate() {
}
