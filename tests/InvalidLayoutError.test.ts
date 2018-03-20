import {expect} from 'chai';
import 'mocha';
import {InvalidLayoutError} from "../src/InvalidLayoutError";

describe("InvalidLayoutError", () => {
    it("Should store layout & message variable", () => {
        const layoutFileName = "test-layout.tsx";
        const message = "This is error message";
        const error = new InvalidLayoutError(layoutFileName, message);

        expect(error.layoutFileName).to.equal(layoutFileName);
        expect(error.message).to.equal(message);
    });
});