import {ArgumentInvalidError, ArgumentNullError, ContentFileCollection, IPlugin, Typesite} from 'typesite';
import {JsxLayoutMeta} from "./JsxLayoutMeta";
import {resolve} from "path";
import {existsSync} from "fs";
import {JsxLayout} from "./JsxLayout";
import {InvalidLayoutError} from "./InvalidLayoutError";
import {renderToString} from "react-dom/server";

export class JsxLayoutPlugin implements IPlugin {
    private _layoutsDirectory: string;
    private _removeDataReactRoot: boolean;
    private _prefix: string;
    private _suffix: string;

    private _layoutsCache: { [id: string]: JsxLayout; };

    constructor(options: {
        layoutsDirectory: string,
        removeDataReactRoot: boolean,
        prefix?: string,
        suffix?: string
    }) {
        if (options.layoutsDirectory === null) {
            throw new ArgumentNullError("layoutsDirectory");
        }

        if (typeof options.layoutsDirectory !== "string") {
            throw new ArgumentInvalidError("layoutsDirectory", `Layouts directory should be null or string, '${options.layoutsDirectory} (${options.layoutsDirectory})' was given`);
        }

        if (!existsSync(options.layoutsDirectory)) {
            throw new ArgumentInvalidError("layoutsDirectory", `Layouts directory "${options.layoutsDirectory}" does not exist or is not readable`);
        }

        this._removeDataReactRoot = options.removeDataReactRoot;
        this._layoutsDirectory = options.layoutsDirectory;
        this._prefix = options.prefix || "";
        this._suffix = options.suffix || "";
        this._layoutsCache = {};

        if (typeof this._prefix !== "string") {
            throw new ArgumentInvalidError("prefix", `Prefix should be null or string, '${this._prefix} (${typeof this._prefix})' was given`);
        }

        if (typeof this._suffix !== "string") {
            throw new ArgumentInvalidError("suffix", `Prefix should be null or string, '${this._suffix} (${typeof this._suffix})' was given`);
        }
    }

    getName(): string {
        return "JSX Layout Plugin";
    }

    async run(files: ContentFileCollection, typesite: Typesite): Promise<void> {
        return files.eachAsync(async (file, path) => {
            const meta = file.metadata.getItem(JsxLayoutMeta);

            if (!meta) {
                return;
            }

            const layout = await this.loadLayout(meta.layoutFileName);
            const contentJsx = layout.render(file.getContents().toString(), path, file, files, typesite);
            let contentsString = renderToString(contentJsx as any);

            if (this._removeDataReactRoot) {
                contentsString = contentsString.replace(/\s+data-reactroot=".*?"/, "");
            }

            file.setContents(this._prefix + contentsString + this._suffix);
        });
    }

    private async loadLayout(layoutFileName: string): Promise<JsxLayout> {
        if (this._layoutsCache.hasOwnProperty(layoutFileName)) {
            return this._layoutsCache[layoutFileName];
        }

        let data;
        try {
            data = await import(resolve(this._layoutsDirectory, layoutFileName));
        } catch (error) {
            throw new InvalidLayoutError(
                layoutFileName,
                "Importing layout file triggered an error: " +
                (error || "Unknown error").toString()
            );
        }

        if (!data) {
            throw new InvalidLayoutError(layoutFileName, "File has no export");
        }
        if (!data.default) {
            throw new InvalidLayoutError(layoutFileName, "File has no default export");
        }
        if (!(data.default instanceof JsxLayout)) {
            throw new InvalidLayoutError(layoutFileName, "Default export is not an instance of 'JsxLayout'");
        }

        return data.default;
    }
}