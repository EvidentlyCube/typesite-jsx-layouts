import {expect} from 'chai';
import 'mocha';
import {ContentFile, Typesite} from "typesite";
import * as React from "react";
import {renderToString} from "react-dom/server";
import {JsxLayout} from "../src/JsxLayout";

describe("JsxLayout", () => {
    it("Should call the render callback", () => {
        const testContent = "Hello, I am a test!";
        const fileSource = new ContentFile("test.txt", "");
        const typesiteSource = new Typesite("", "");
        const layout = new JsxLayout((content, file, typesite) => {
            expect(content).to.deep.equal({
                __html: testContent
            });
            expect(file).to.equal(fileSource);
            expect(typesite).to.equal(typesiteSource);

            return <div>Test</div>;
        });

        const expected = renderToString(<div>Test</div> as any);
        const result = renderToString(layout.render(testContent, fileSource, typesiteSource) as any);

        expect(result).to.equal(expected);
    });
});