abstract class Properties {
    constructor(protected props) {
    }

    getAll() {
        return this.props;
    }

    toKVPairsArray() {
        const propsArray = [];
        for (let i in this.props) {
            propsArray.push(i);
            propsArray.push(this.props[i]);
        }

        return propsArray;
    };
}

export class StaticProperties extends Properties {
}

export class DynamicProperties extends Properties {
}

export class Key {
    constructor(private _name) {
    }

    public getName() {
        return this._name;
    }
}

export class Tags {
    private tags: string[]|Array<any>;

    constructor(tagOrTags: string|string[]) {
        this.tags = tagOrTags instanceof Array ? tagOrTags : [tagOrTags];
    }

    getAll() {
        return this.tags;
    }
}
