import {JsxLayout} from "../../src/JsxLayout";
import * as React from "react";

export default new JsxLayout((content, file, typesite) => {
    return <div dangerouslySetInnerHTML={content}/>;
});