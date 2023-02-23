var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Html, Head, Main, NextScript } from 'next/document';
export default function Document() {
    return (_jsxs(Html, __assign({ lang: "en" }, { children: [_jsx(Head, {}), _jsxs("body", { children: [_jsx(Main, {}), _jsx(NextScript, {})] })] })));
}
//# sourceMappingURL=_document.js.map