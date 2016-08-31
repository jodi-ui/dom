import {text as incrementalDOMText, elementClose, elementOpen, elementVoid, patch} from 'incremental-dom';

const _propKVToArray = (props) => {
    const propsArray = [];
    for (let i in props) {
        propsArray.push(i);
        propsArray.push(props[i]);
    }

    return propsArray;
};

export function el(
    tag: any,
    staticProps: Object|Function = {},
    dynamicProps: Object|Function = {},
    cb: Function = () => {
    }
): HTMLElement {
    let tags: string[] = tag;
    let callback = cb;
    let staticProperties = staticProps;
    let dynamicProperties = dynamicProps;
    let lastOpenedNode: HTMLElement;
    let lastClosedNode: HTMLElement;

    if ('string' == typeof tag || tag instanceof String) {
        tags = [tag];
    }

    if (staticProps instanceof Function) {
        callback = staticProps;
        staticProperties = {};
        dynamicProperties = {};
    }

    if (dynamicProps instanceof Function) {
        callback = dynamicProps;
        dynamicProperties = {};
    }

    tags.forEach(tag => {
        lastOpenedNode = elementOpen.apply(
            undefined,
            [
                tag,
                null,
                _propKVToArray(staticProperties)
            ].concat(
                _propKVToArray(dynamicProperties)
            )
        );
    });

    callback(lastOpenedNode);

    tags.reverse();
    tags.forEach(tag => {
        lastClosedNode = elementClose.call(undefined, tag);
    });

    return lastClosedNode;
}

export function elVoid(tag: string, staticProps: Object = {}, dynamicProps: Object = {}) {
    return elementVoid.apply(
        undefined,
        [
            tag,
            null,
            _propKVToArray(staticProps),
        ].concat(
            _propKVToArray(dynamicProps)
        )
    );
}

export function text(text) {
    incrementalDOMText(text);
}

export function render <T>(node: Node, callback: (data: T) => void, data?: T) {
    return patch(node, callback, data);
}
