import {JsxLayout} from "../../src/JsxLayout";
import * as React from "react";
import DataTransport from "../utils/TestDataTransport";

export default new JsxLayout((content, path, file, files, typesite) => {
    DataTransport.path = path;
    DataTransport.file = file;
    DataTransport.files = files;
    DataTransport.typesite = typesite;
    return <div dangerouslySetInnerHTML={content}/>;
});