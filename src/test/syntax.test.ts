import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';


async function grammar(fixtureName: string): Promise<Array<any>> {
    const fixturePath = path.join(`${__dirname}/../../src/test/fixtures`, fixtureName);
    const parsedGrammar =  await vscode.commands.executeCommand('_workbench.captureSyntaxTokens', vscode.Uri.file(fixturePath));
    return parsedGrammar as Array<any>;
}


suite("Syntax", function () {
    test("heading", async () => {
        const actual = await grammar('heading.wiki');
        const expected = [
            {c: "==", t: "text.yandex.wiki markup.heading.1.yandex.wiki"},
            {c: " H1", t: "text.yandex.wiki entity.name.section.yandex.wiki"},
            {c: "===", t: "text.yandex.wiki markup.heading.2.yandex.wiki"},
            {c: " H2", t: "text.yandex.wiki entity.name.section.yandex.wiki"},
            {c: "====", t: "text.yandex.wiki markup.heading.3.yandex.wiki"},
            {c: " H3", t: "text.yandex.wiki entity.name.section.yandex.wiki"},
            {c: "=====", t: "text.yandex.wiki markup.heading.4.yandex.wiki"},
            {c: " H4", t: "text.yandex.wiki entity.name.section.yandex.wiki"},
            {c: "======", t: "text.yandex.wiki markup.heading.5.yandex.wiki"},
            {c: " H5", t: "text.yandex.wiki entity.name.section.yandex.wiki"},
            {c: "=======", t: "text.yandex.wiki markup.heading.6.yandex.wiki"},
            {c: " H6", t: "text.yandex.wiki entity.name.section.yandex.wiki"},
        ];

        expected.forEach((element, index) => {
            assert.equal(actual[index].c, element.c);
            assert.equal(actual[index].t, element.t);
        });
    });
});