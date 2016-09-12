import {Tags, Key, StaticProperties, DynamicProperties} from './classes';
import {elementClose, elementOpen, elementVoid} from 'incremental-dom';

export const renderElement = (
    tags: Tags,
    key: Key,
    staticProperties: StaticProperties,
    dynamicProperties: DynamicProperties,
    callback: Function
): HTMLElement => {
    const allTags = tags.getAll();

    let lastOpenedNode: HTMLElement;
    let lastClosedNode: HTMLElement;

    allTags.forEach(tag => {
        lastOpenedNode = elementOpen.apply(
            undefined,
            [
                tag,
                key.getName(),
                staticProperties.toKVPairsArray()
            ].concat(
                dynamicProperties.toKVPairsArray()
            )
        );
    });

    callback(lastOpenedNode);

    allTags.reverse();
    allTags.forEach(tag => {
        lastClosedNode = elementClose.call(undefined, tag);
    });

    return lastClosedNode;
};

export const renderVoidElement = (
    tag: string,
    key: Key,
    staticProperties: StaticProperties,
    dynamicProperties: DynamicProperties
): HTMLElement => elementVoid.apply(
    undefined,
    [
        tag,
        key.getName(),
        staticProperties.toKVPairsArray()
    ].concat(
        dynamicProperties.toKVPairsArray()
    )
);

export const dynamicProps = (props) => new DynamicProperties(props);
export const staticProps = (props) => new StaticProperties(props);
export const key = (props) => new Key(props);
