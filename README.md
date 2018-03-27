# Typesite-jsx-layouts

A plugin for [Typesite](https://github.com/EvidentlyCube/typesite) that allows you to wrap file contents' with a JSX layout and render it all to HTML.

## Installation

Run `npm install typesite-jsx-layouts`

## How to use

First register `JsxLayoutPlugin` plugin in your Typesite project:
 
```typescript
typesite.use(new JsxLayoutPlugin({
    layoutsDirectory: "src/layouts",
    removeDataReactRoot: true,
    prefix: "<!DOCTYPE html>",
    suffix: "<!-- Website made with Typesite -->"
}));
```

Then add `JsxLayoutMeta` to the frontmatter of whatever files you want to put into a layout. It takes one argument, the name or path to the layout file relative to the layouts directory provided to `JsxLayoutPlugin`, including file extension:

```typescript
export default new Frontmatter(
    new JsxLayoutMeta('wrap.tsx'),
    "I will have my own layout today~~!"
);
```

Then, finally, create a new `.tsx` file in your layouts directory and export new instance of `JsxLayout`. It takes a callback which will be given the file's contents neatly wrapped in `{__html: ""}` for immediate use in JSX, `ContentFile` and `Typesite` as params and will expect you to return `JSX.Element`:

```typescript
export default new JsxLayout((content, file, typesite) => {
    return <html>
    	<head>
    		<title>{file.metadata.getMeta(CommonMeta).title}</title>
    	</head>
        <div dangerouslySetInnerHTML={content}/>
    </html>;
});
```

And that's it!

## API

### `JsxLayoutPlugin`
The plugin that performs the wrapping in layout.

#### `constructor`
 
 * **Argument** `options.layoutsDirectory: string` The relative or absolute path to the directory containing the layouts. The layouts defined in `JsxLayoutMeta` will be resolved by being joined with this value.
 * **Argument** `options.removeDataReactRoot: boolean` Controls whether to remove any and all `data-reactroot` attributes that might appear 
 * **Argument** `options.prefix: string` and `options.suffix: string` Optional strings which are added before and after the layout respectively. Useful if you want to add doctype before the actual HTML or anything else that can't be a valid JSX.
 * **Exception** `Typesite.ArgumentNullError` when `options.layoutsDirectory` is null
 * **Exception** `Typepsite.ArgumentInvalidError` when:
   * `options.layoutsDirectory` does not exist
   * `options.prefix` is not `null` or a `string`
   * `options.suffix` is not `null` or a `string`

### `JsxLayoutMeta`
The meta that defines which layout to use for the given file

#### `constructor`

 * **Argument** `layoutFileName :string` Name or path to the layout file, relative to `layoutsDirectory` defined in `JsxLayoutPlugin` 
 * **Exception** `Typesite.ArgumentNullError` When `layoutFileName` is null
 * **Exception** `Typesite.ArgumentInvalidError` When `layoutFileName` is not a string
 
### `JsxLayout`
A class defining layout's contents.

#### `constructor`

 * **Argument** `render: (content: { __html: string }, path: string, file: ContentFile, files:ContentFileCollection, typesite: Typesite) => JSX.Element` A function that should return the final content of the file after being wrapped. `content` is already prepared for use with `dangerouslySetInnerHTML`
 * **Exception** `Typesite.ArgumentNullError` When `render` is null
 * **Exception** `Typesite.ArgumentInvalidError` When `render` is not a function
 
### `InvalidLayoutError`
Exception thrown when layout file cannot be found, is not accessible, is incorrect or does not `export default` an instance of `JsxLayout`.

 * **Getter** `layoutFileName` Name of the file which had thrown an error