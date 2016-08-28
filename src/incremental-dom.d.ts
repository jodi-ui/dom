declare module 'incremental-dom' {
    export function elementOpen(tag:string, key?:string, statics?:Array<any>, ...const_args):Element;
    export function elementClose(tag:string):Element;
    export function elementVoid(tag:string, key?:string, statics?:Array<any>, ...const_args):Element;
    export function text(value, ...const_args);
    export function patch(node:Element, fn:Function, data?:any);
}
