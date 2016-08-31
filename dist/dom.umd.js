(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'incremental-dom'], factory);
    }
})(function (require, exports) {
    "use strict";
    var incremental_dom_1 = require('incremental-dom');
    var _propKVToArray = function (props) {
        var propsArray = [];
        for (var i in props) {
            propsArray.push(i);
            propsArray.push(props[i]);
        }
        return propsArray;
    };
    function el(tag, staticProps, dynamicProps, cb) {
        if (staticProps === void 0) { staticProps = {}; }
        if (dynamicProps === void 0) { dynamicProps = {}; }
        if (cb === void 0) { cb = function () {
        }; }
        var tags = tag;
        var callback = cb;
        var staticProperties = staticProps;
        var dynamicProperties = dynamicProps;
        var lastOpenedNode;
        var lastClosedNode;
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
        tags.forEach(function (tag) {
            lastOpenedNode = incremental_dom_1.elementOpen.apply(undefined, [
                tag,
                null,
                _propKVToArray(staticProperties)
            ].concat(_propKVToArray(dynamicProperties)));
        });
        callback(lastOpenedNode);
        tags.reverse();
        tags.forEach(function (tag) {
            lastClosedNode = incremental_dom_1.elementClose.call(undefined, tag);
        });
        return lastClosedNode;
    }
    exports.el = el;
    function elVoid(tag, staticProps, dynamicProps) {
        if (staticProps === void 0) { staticProps = {}; }
        if (dynamicProps === void 0) { dynamicProps = {}; }
        return incremental_dom_1.elementVoid.apply(undefined, [
            tag,
            null,
            _propKVToArray(staticProps),
        ].concat(_propKVToArray(dynamicProps)));
    }
    exports.elVoid = elVoid;
    function text(text) {
        incremental_dom_1.text(text);
    }
    exports.text = text;
    function render(node, callback, data) {
        return incremental_dom_1.patch(node, callback, data);
    }
    exports.render = render;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFBQSxnQ0FBd0YsaUJBQWlCLENBQUMsQ0FBQTtJQUUxRyxJQUFNLGNBQWMsR0FBRyxVQUFDLEtBQUs7UUFDekIsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEIsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3RCLENBQUMsQ0FBQztJQUVGLFlBQ0ksR0FBUSxFQUNSLFdBQWlDLEVBQ2pDLFlBQWtDLEVBQ2xDLEVBQ0M7UUFIRCwyQkFBaUMsR0FBakMsZ0JBQWlDO1FBQ2pDLDRCQUFrQyxHQUFsQyxpQkFBa0M7UUFDbEMsa0JBQ0MsR0FERCxLQUFlO1FBQ2YsQ0FBQztRQUVELElBQUksSUFBSSxHQUFhLEdBQUcsQ0FBQztRQUN6QixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7UUFDbkMsSUFBSSxpQkFBaUIsR0FBRyxZQUFZLENBQUM7UUFDckMsSUFBSSxjQUEyQixDQUFDO1FBQ2hDLElBQUksY0FBMkIsQ0FBQztRQUVoQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksT0FBTyxHQUFHLElBQUksR0FBRyxZQUFZLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFdBQVcsWUFBWSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLFFBQVEsR0FBRyxXQUFXLENBQUM7WUFDdkIsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsWUFBWSxZQUFZLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkMsUUFBUSxHQUFHLFlBQVksQ0FBQztZQUN4QixpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ1osY0FBYyxHQUFHLDZCQUFXLENBQUMsS0FBSyxDQUM5QixTQUFTLEVBQ1Q7Z0JBQ0ksR0FBRztnQkFDSCxJQUFJO2dCQUNKLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQzthQUNuQyxDQUFDLE1BQU0sQ0FDSixjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FDcEMsQ0FDSixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFekIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDWixjQUFjLEdBQUcsOEJBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUMxQixDQUFDO0lBbERlLFVBQUUsS0FrRGpCLENBQUE7SUFFRCxnQkFBdUIsR0FBVyxFQUFFLFdBQXdCLEVBQUUsWUFBeUI7UUFBbkQsMkJBQXdCLEdBQXhCLGdCQUF3QjtRQUFFLDRCQUF5QixHQUF6QixpQkFBeUI7UUFDbkYsTUFBTSxDQUFDLDZCQUFXLENBQUMsS0FBSyxDQUNwQixTQUFTLEVBQ1Q7WUFDSSxHQUFHO1lBQ0gsSUFBSTtZQUNKLGNBQWMsQ0FBQyxXQUFXLENBQUM7U0FDOUIsQ0FBQyxNQUFNLENBQ0osY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUMvQixDQUNKLENBQUM7SUFDTixDQUFDO0lBWGUsY0FBTSxTQVdyQixDQUFBO0lBRUQsY0FBcUIsSUFBSTtRQUNyQixzQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRmUsWUFBSSxPQUVuQixDQUFBO0lBRUQsZ0JBQTJCLElBQVUsRUFBRSxRQUEyQixFQUFFLElBQVE7UUFDeEUsTUFBTSxDQUFDLHVCQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRmUsY0FBTSxTQUVyQixDQUFBIn0=