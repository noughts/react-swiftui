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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
var inter = Inter({ subsets: ['latin'] });
export default function Home() {
    return (_jsxs(_Fragment, { children: [_jsxs(Head, { children: [_jsx("title", { children: "Create Next App" }), _jsx("meta", { name: "description", content: "Generated by create next app" }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), _jsx("link", { rel: "icon", href: "/favicon.ico" })] }), _jsxs("main", __assign({ className: styles.main }, { children: [_jsxs("div", __assign({ className: styles.description }, { children: [_jsxs("p", { children: ["Get started by editing\u00A0", _jsx("code", __assign({ className: styles.code }, { children: "src/pages/index.tsx" }))] }), _jsx("div", { children: _jsxs("a", __assign({ href: "https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app", target: "_blank", rel: "noopener noreferrer" }, { children: ["By", ' ', _jsx(Image, { src: "/vercel.svg", alt: "Vercel Logo", className: styles.vercelLogo, width: 100, height: 24, priority: true })] })) })] })), _jsxs("div", __assign({ className: styles.center }, { children: [_jsx(Image, { className: styles.logo, src: "/next.svg", alt: "Next.js Logo", width: 180, height: 37, priority: true }), _jsx("div", __assign({ className: styles.thirteen }, { children: _jsx(Image, { src: "/thirteen.svg", alt: "13", width: 40, height: 31, priority: true }) }))] })), _jsxs("div", __assign({ className: styles.grid }, { children: [_jsxs("a", __assign({ href: "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app", className: styles.card, target: "_blank", rel: "noopener noreferrer" }, { children: [_jsxs("h2", __assign({ className: inter.className }, { children: ["Docs ", _jsx("span", { children: "->" })] })), _jsx("p", __assign({ className: inter.className }, { children: "Find in-depth information about Next.js features and\u00A0API." }))] })), _jsxs("a", __assign({ href: "https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app", className: styles.card, target: "_blank", rel: "noopener noreferrer" }, { children: [_jsxs("h2", __assign({ className: inter.className }, { children: ["Learn ", _jsx("span", { children: "->" })] })), _jsx("p", __assign({ className: inter.className }, { children: "Learn about Next.js in an interactive course with\u00A0quizzes!" }))] })), _jsxs("a", __assign({ href: "https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app", className: styles.card, target: "_blank", rel: "noopener noreferrer" }, { children: [_jsxs("h2", __assign({ className: inter.className }, { children: ["Templates ", _jsx("span", { children: "->" })] })), _jsx("p", __assign({ className: inter.className }, { children: "Discover and deploy boilerplate example Next.js\u00A0projects." }))] })), _jsxs("a", __assign({ href: "https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app", className: styles.card, target: "_blank", rel: "noopener noreferrer" }, { children: [_jsxs("h2", __assign({ className: inter.className }, { children: ["Deploy ", _jsx("span", { children: "->" })] })), _jsx("p", __assign({ className: inter.className }, { children: "Instantly deploy your Next.js site to a shareable URL with\u00A0Vercel." }))] }))] }))] }))] }));
}
//# sourceMappingURL=index.js.map