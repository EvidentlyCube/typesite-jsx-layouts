import {expect} from 'chai';
import 'mocha';
import * as React from "react";
import {JsxLayoutMeta} from "../src/JsxLayoutMeta";

describe("JsxLayoutMeta", () => {
    it("Should have the layout file name set", () => {
        const layoutFileName = "test-layout.tsx";
        const meta = new JsxLayoutMeta(layoutFileName);

        expect(meta.layoutFileName).to.equal(layoutFileName);
    });
});