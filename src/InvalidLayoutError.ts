export class InvalidLayoutError extends Error {
    private _layoutFileName: string;

    public get layoutFileName(): string {
        return this._layoutFileName;
    }

    constructor(layoutFileName: string, message: string) {
        super(message);

        this._layoutFileName = layoutFileName;
    }

    toString(): string {
        return `Problem with JSX layout "${this.layoutFileName}": ${this.message}`;
    }
}