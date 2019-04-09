import * as vscode from 'vscode';


function arrayUnique(array: Array<any>, key: (a: any, b: any) => Boolean): Array<any> {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(key(a[i],a[j])) {
                a.splice(j--, 1);
            }
        }
    }

    return a;
}

function setupTheme(){
    const configuration = vscode.workspace.getConfiguration();
    const existedRules = configuration.get('editor.tokenColorCustomizations') as any;
    const baseTheme = require('../themes/wiki.tmTheme.json');
    const mergedRules = existedRules.textMateRules.concat(baseTheme.tokenColors);
    configuration.update('editor.tokenColorCustomizations', {
        "textMateRules": arrayUnique(
            mergedRules,
            (a: any, b: any) => a.name === b.name
        )
    }, true);
}

export function activate(context: vscode.ExtensionContext) {
    setupTheme();
}