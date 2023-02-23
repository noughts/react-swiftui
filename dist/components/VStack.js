var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
var VStack = /** @class */ (function (_super) {
    __extends(VStack, _super);
    function VStack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VStack.prototype.render = function () {
        return _jsx("div", { children: "this is VStack" });
    };
    return VStack;
}(React.Component));
export default VStack;
//# sourceMappingURL=VStack.js.map