import {expect} from 'chai';
import 'mocha';
import {ContentFile, ContentFileCollection, Typesite} from "typesite";
import * as React from "react";
import {renderToString} from "react-dom/server";
import {JsxLayout} from "../src/JsxLayout";

describe("JsxLayout", () => {
    it("Should call the render callback", () => {
        const testContent = "Hello, I am a test!";
        const pathSource = "out.txt";
        const fileSource = new ContentFile("test.txt", "");
        const filesSource = new ContentFileCollection("");
        const typesiteSource = new Typesite("", "");
        const layout = new JsxLayout((content, path, file, files, typesite) => {
            expect(content).to.deep.equal({
                __html: testContent
            });
            expect(path).to.equal(pathSource);
            expect(file).to.equal(fileSource);
            expect(files).to.equal(filesSource);
            expect(typesite).to.equal(typesiteSource);

            return <div>Test</div>;
        });

        const expected = renderToString(<div>Test</div> as any);
        const result = renderToString(layout.render(testContent, pathSource, fileSource, filesSource, typesiteSource) as any);

        expect(result).to.equal(expected);
    });
});