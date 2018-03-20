import {ArgumentNullError, ContentFile, Typesite} from 'typesite';

export class JsxLayout {
    private _render: (content: { __html: string }, file: ContentFile, typesite: Typesite) => JSX.Element;

    constructor(render: (content: { __html: string }, file: ContentFile, typesite: Typesite) => JSX.Element) {
        if (!render) {
            throw new ArgumentNullError("render");
        }
        this._render = render;
    }

    public render(content: string, file: ContentFile, typesite: Typesite): JSX.Element {
        return this._render({__html: content}, file, typesite);
    }
}