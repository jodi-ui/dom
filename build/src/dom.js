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
            incremental_dom_1.elementOpen.apply(undefined, [
                tag,
                null,
                _propKVToArray(staticProperties)
            ].concat(_propKVToArray(dynamicProperties)));
        });
        callback();
        tags.reverse();
        tags.forEach(function (tag) {
            lastClosedNode = incremental_dom_1.elementClose(tag);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFBQSxnQ0FBd0YsaUJBQWlCLENBQUMsQ0FBQTtJQUUxRyxJQUFNLGNBQWMsR0FBRyxVQUFDLEtBQUs7UUFDekIsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEIsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3RCLENBQUMsQ0FBQztJQUVGLFlBQ0ksR0FBUSxFQUNSLFdBQWlDLEVBQ2pDLFlBQWtDLEVBQ2xDLEVBQ0M7UUFIRCwyQkFBaUMsR0FBakMsZ0JBQWlDO1FBQ2pDLDRCQUFrQyxHQUFsQyxpQkFBa0M7UUFDbEMsa0JBQ0MsR0FERCxLQUFlO1FBQ2YsQ0FBQztRQUVELElBQUksSUFBSSxHQUFhLEdBQUcsQ0FBQztRQUN6QixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7UUFDbkMsSUFBSSxpQkFBaUIsR0FBRyxZQUFZLENBQUM7UUFDckMsSUFBSSxjQUFjLENBQUM7UUFFbkIsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2xELElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxXQUFXLFlBQVksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQyxRQUFRLEdBQUcsV0FBVyxDQUFDO1lBQ3ZCLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztZQUN0QixpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFlBQVksWUFBWSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ25DLFFBQVEsR0FBRyxZQUFZLENBQUM7WUFDeEIsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUNaLDZCQUFXLENBQUMsS0FBSyxDQUNiLFNBQVMsRUFDVDtnQkFDSSxHQUFHO2dCQUNILElBQUk7Z0JBQ0osY0FBYyxDQUFDLGdCQUFnQixDQUFDO2FBQ25DLENBQUMsTUFBTSxDQUNKLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUNwQyxDQUNKLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsRUFBRSxDQUFDO1FBRVgsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FDUixVQUFBLEdBQUc7WUFDQyxjQUFjLEdBQUcsOEJBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUVQLE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFDMUIsQ0FBQztJQWxEZSxVQUFFLEtBa0RqQixDQUFBO0lBRUQsZ0JBQXVCLEdBQVcsRUFBRSxXQUF3QixFQUFFLFlBQXlCO1FBQW5ELDJCQUF3QixHQUF4QixnQkFBd0I7UUFBRSw0QkFBeUIsR0FBekIsaUJBQXlCO1FBQ25GLE1BQU0sQ0FBQyw2QkFBVyxDQUFDLEtBQUssQ0FDcEIsU0FBUyxFQUNUO1lBQ0ksR0FBRztZQUNILElBQUk7WUFDSixjQUFjLENBQUMsV0FBVyxDQUFDO1NBQzlCLENBQUMsTUFBTSxDQUNKLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FDL0IsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQVhlLGNBQU0sU0FXckIsQ0FBQTtJQUVELGNBQXFCLElBQUk7UUFDckIsc0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUZlLFlBQUksT0FFbkIsQ0FBQTtJQUVELGdCQUF1QixJQUFhLEVBQUUsUUFBa0IsRUFBRSxJQUFVO1FBQ2hFLE1BQU0sQ0FBQyx1QkFBSyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUZlLGNBQU0sU0FFckIsQ0FBQSJ9