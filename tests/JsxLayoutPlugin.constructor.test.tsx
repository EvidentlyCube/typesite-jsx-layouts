import {expect} from 'chai';
import 'mocha';
import {ArgumentInvalidError, ArgumentNullError} from "typesite";
import * as React from "react";
import {JsxLayoutPlugin} from "../src/JsxLayoutPlugin";

describe("JsxLayoutPlugin - Constructor argument validation", () => {
    const layoutsDirectory = __dirname + "/fixtures.layouts/";

    describe('options.layoutsDirectory', () => {
        it("null", () => {
            expect(() => new JsxLayoutPlugin({
                removeDataReactRoot: true,
                layoutsDirectory: null
            } as any)).to.throw(ArgumentNullError);
        });

        it("undefined", () => {
            expect(() => new JsxLayoutPlugin({
                removeDataReactRoot: true,
                layoutsDirectory: null
            } as any)).to.throw(ArgumentNullError);
        });

        const illegalArguments = [
            1,
            Number.NaN,
            [],
            {},
            new Date(),
            Date
        ];

        for (let argument of illegalArguments) {
            it(`${JSON.stringify(argument)}`, () => {
                expect(() => new JsxLayoutPlugin({
                    removeDataReactRoot: true,
                    layoutsDirectory: argument
                } as any)).to.throw(ArgumentInvalidError);
            });
        }
    });

    describe('options.prefix', () => {
        const illegalArguments = [
            1,
            [],
            {},
            new Date(),
            Date
        ];

        for (let argument of illegalArguments) {
            it(`${JSON.stringify(argument)}`, () => {
                expect(() => new JsxLayoutPlugin({
                    removeDataReactRoot: true,
                    layoutsDirectory: layoutsDirectory,
                    prefix: argument
                } as any)).to.throw(ArgumentInvalidError);
            });
        }
    });

    describe('options.suffix', () => {
        const illegalArguments = [
            1,
            [],
            {},
            new Date(),
            Date
        ];

        for (let argument of illegalArguments) {
            it(`${JSON.stringify(argument)}`, () => {
                expect(() => new JsxLayoutPlugin({
                    removeDataReactRoot: true,
                    layoutsDirectory: layoutsDirectory,
                    suffix: argument
                } as any)).to.throw(ArgumentInvalidError);
            });
        }
    });
});