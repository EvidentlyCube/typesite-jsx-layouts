import {IMeta} from 'typesite';

export class JsxLayoutMeta implements IMeta {
    private _layoutFileName: string;

    public get layoutFileName(): string {
        return this._layoutFileName;
    }

    constructor(layoutFileName: string) {
        this._layoutFileName = layoutFileName;
    }

    getKey(): string {
        return 'jsxLayout';
    }
}