"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const NavBar = () => {
    return (react_1.default.createElement("nav", { className: "bg-red" },
        react_1.default.createElement("div", { className: "flex items-center flex-shrink-0 text-white mr-6" },
            react_1.default.createElement("span", { className: "font-semibold text-xl tracking-tight" }, "twilio"))));
};
exports.default = NavBar;
