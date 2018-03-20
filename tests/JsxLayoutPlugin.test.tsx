import {expect} from 'chai';
import 'mocha';
import {ContentFile, ContentFileCollection, Typesite} from "typesite";
import * as React from "react";
import {JsxLayoutPlugin} from "../src/JsxLayoutPlugin";
import {JsxLayoutMeta} from "../src/JsxLayoutMeta";

describe("JsxLayoutPlugin", () => {
    const testStartContents = "This is contents!";
    const layoutsDirectory = __dirname + "/fixtures.layouts/";

    it("Should render inside layout", async () => {
        const testFile = new ContentFile("test.txt", "");
        const testFileCollection = new ContentFileCollection("");
        const typesite = new Typesite("", "");
        testFile.setContents(testStartContents);
        testFile.metadata.setItem(new JsxLayoutMeta("test.tsx"));
        testFileCollection.addFile("test.txt", testFile);

        const plugin = new JsxLayoutPlugin({
            layoutsDirectory: layoutsDirectory,
            removeDataReactRoot: true
        });

        await plugin.run(testFileCollection, typesite);

        expect(testFile.getContents().toString()).to.equal(`<div>${testStartContents}</div>`);
    });

    it("Should not strip data-reactroot", async () => {
        const testFile = new ContentFile("test.txt", "");
        const testFileCollection = new ContentFileCollection("");
        const typesite = new Typesite("", "");
        testFile.setContents(testStartContents);
        testFile.metadata.setItem(new JsxLayoutMeta("test.tsx"));
        testFileCollection.addFile("test.txt", testFile);

        const plugin = new JsxLayoutPlugin({
            layoutsDirectory: layoutsDirectory,
            removeDataReactRoot: false
        });

        await plugin.run(testFileCollection, typesite);

        expect(testFile.getContents().toString()).to.equal(`<div data-reactroot="">${testStartContents}</div>`);
    });

    it("Should add prefix and suffix", async () => {
        const testFile = new ContentFile("test.txt", "");
        const testFileCollection = new ContentFileCollection("");
        const typesite = new Typesite("", "");
        testFile.setContents(testStartContents);
        testFile.metadata.setItem(new JsxLayoutMeta("test.tsx"));
        testFileCollection.addFile("test.txt", testFile);

        const plugin = new JsxLayoutPlugin({
            layoutsDirectory: layoutsDirectory,
            removeDataReactRoot: true,
            prefix: "START",
            suffix: "END"
        });

        await plugin.run(testFileCollection, typesite);

        expect(testFile.getContents().toString()).to.equal(`START<div>${testStartContents}</div>END`);
    });
});