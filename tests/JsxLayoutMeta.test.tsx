import {expect} from 'chai';
import 'mocha';
import * as React from "react";
import {JsxLayoutMeta} from "../src/JsxLayoutMeta";
import {ArgumentInvalidError, ArgumentNullError} from "typesite";

describe("JsxLayoutMeta", () => {
    describe("Constructor argument validation", () => {
        it("layoutFileName=null", () => {
            expect(() => new JsxLayoutMeta(null as any)).to.throw(ArgumentNullError);
        });

        it("layoutFileName=undefined", () => {
            expect(() => new JsxLayoutMeta(null as any)).to.throw(ArgumentNullError);
        });

        const illegalArguments = [
            1,
            Number.NaN,
            [],
            {},
            new Date()
        ];

        for (let argument of illegalArguments) {
            it(`layoutFileName=${JSON.stringify(argument)}`, () => {
                expect(() => new JsxLayoutMeta(argument as any)).to.throw(ArgumentInvalidError);
            });
        }
    });
    it("Should have the layout file name set", () => {
        const layoutFileName = "test-layout.tsx";
        const meta = new JsxLayoutMeta(layoutFileName);

        expect(meta.layoutFileName).to.equal(layoutFileName);
    });
});