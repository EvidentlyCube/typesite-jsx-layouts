import {ArgumentInvalidError, ArgumentNullError, IMeta} from 'typesite';

export class JsxLayoutMeta implements IMeta {
    private _layoutFileName: string;

    public get layoutFileName(): string {
        return this._layoutFileName;
    }

    constructor(layoutFileName: string) {
        if (layoutFileName === null) {
            throw new ArgumentNullError("layoutFileName", 'layoutFileName cannot be null');
        }

        if (typeof layoutFileName !== "string") {
            throw new ArgumentInvalidError("layoutFileName", `layoutFileName has to be a string, '${JSON.stringify(layoutFileName)} (${typeof layoutFileName})' was given`);
        }



        this._layoutFileName = layoutFileName;
    }

    getKey(): string {
        return 'jsxLayout';
    }
}