"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyFormat = void 0;
const currencies = {
    USD: {
        name: "Dollars",
        symbol: "$",
    },
    PEN: {
        name: "Soles",
        symbol: "S/",
    },
};
const currencyFormat = (value, currencyCode) => {
    const sign = value < 0 ? "-" : "";
    const currency = currencies[currencyCode];
    const valueFormat = new Intl.NumberFormat("en", {
        minimumFractionDigits: 2,
    }).format(Math.abs(value));
    return `${sign}${currency.symbol} ${valueFormat}`;
};
exports.currencyFormat = currencyFormat;
//# sourceMappingURL=currencyFormat.js.map