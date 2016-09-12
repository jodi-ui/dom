import {text as incrementalDOMText, elementClose, elementOpen, elementVoid, patch} from 'incremental-dom';
import {Tags, StaticProperties, DynamicProperties, Key} from './classes';
import {renderElement, renderVoidElement} from './functions';

export function el(tagOrTags, ...params): HTMLElement {
    const tags = new Tags(tagOrTags);

    let key = new Key(null);
    let staticProperties = new StaticProperties({});
    let dynamicProperties = new DynamicProperties({});
    let callback = () => {
    };

    params.forEach(param => {
        if (param instanceof Key) {
            key = param;
        }

        if (param instanceof StaticProperties) {
            staticProperties = param;
        }

        if (param instanceof DynamicProperties) {
            dynamicProperties = param;
        }

        if (param instanceof Function) {
            callback = param;
        }
    });

    return renderElement(tags, key, staticProperties, dynamicProperties, callback);
}

export function elVoid(tag: string, ...params): HTMLElement {
    let key = new Key(null);
    let staticProperties = new StaticProperties({});
    let dynamicProperties = new DynamicProperties({});

    params.forEach(param => {
        if (param instanceof Key) {
            key = param;
        }

        if (param instanceof StaticProperties) {
            staticProperties = param;
        }

        if (param instanceof DynamicProperties) {
            dynamicProperties = param;
        }
    });

    return renderVoidElement(tag, key, staticProperties, dynamicProperties);
}

export function text(text) {
    incrementalDOMText(text);
}

export function render <T>(node: Node, callback: (data: T) => void, data?: T) {
    return patch(node, callback, data);
}
