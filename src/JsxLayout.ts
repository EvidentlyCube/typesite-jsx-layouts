import {ArgumentNullError, ContentFile, ContentFileCollection, Typesite} from 'typesite';

export class JsxLayout {
    private _render: (content: { __html: string }, path: string, file: ContentFile, files:ContentFileCollection, typesite: Typesite) => JSX.Element;

    constructor(render: (content: { __html: string }, path: string, file: ContentFile, files:ContentFileCollection, typesite: Typesite) => JSX.Element) {
        if (!render) {
            throw new ArgumentNullError("render");
        }
        this._render = render;
    }

    public render(content: string, path: string, file: ContentFile, files:ContentFileCollection, typesite: Typesite): JSX.Element {
        return this._render({__html: content}, path, file, files, typesite);
    }
}