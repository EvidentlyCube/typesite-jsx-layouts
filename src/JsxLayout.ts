import {ArgumentInvalidError, ArgumentNullError, ContentFile, ContentFileCollection, Typesite} from 'typesite';

export class JsxLayout {
    private _render: (content: { __html: string }, path: string, file: ContentFile, files: ContentFileCollection, typesite: Typesite) => JSX.Element;

    constructor(render: (content: { __html: string }, path: string, file: ContentFile, files: ContentFileCollection, typesite: Typesite) => JSX.Element) {
        if (render === null) {
            throw new ArgumentNullError("render", 'render cannot be null');
        }
        if (typeof render !== "function") {
            throw new ArgumentInvalidError("render", `render has to be a function, '${JSON.stringify(render)} (${typeof render})' was given`);
        }

        this._render = render;
    }

    public render(content: string, path: string, file: ContentFile, files: ContentFileCollection, typesite: Typesite): JSX.Element {
        return this._render({__html: content}, path, file, files, typesite);
    }
}