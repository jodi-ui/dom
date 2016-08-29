// TODO I think we should create a DefinitelyTyped item out of it
declare module 'incremental-dom' {
    export function elementOpen(tag:string, key?:string, statics?:Array<any>, ...const_args):Element;
    export function elementClose(tag:string):Element;
    export function elementVoid(tag:string, key?:string, statics?:Array<any>, ...const_args):Element;
    export function text(value, ...const_args);
    export function patch(node:Element, fn:Function, data?:any);
}

// TODO for now
// rename it to typings and move it to main directory
// create a dist direcotory
// to which we will export dom.js as dom.umd.js
// TODO need to do smth to that source map



