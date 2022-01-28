"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Layout_1 = __importDefault(require("./components/Layout/Layout"));
require("./index.css");
const DeployApp = () => {
    const deploy = () => {
        fetch('http://localhost:3001/deploy')
            .then((resp) => __awaiter(void 0, void 0, void 0, function* () {
            const message = yield resp.json();
            console.log(message);
        }))
            .catch(err => console.log(err));
    };
    return (react_1.default.createElement(Layout_1.default, null,
        react_1.default.createElement("button", { onClick: deploy, className: "bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" }, "Button"),
        "hello"));
};
exports.default = DeployApp;
