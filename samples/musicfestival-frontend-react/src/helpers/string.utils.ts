// declare global {
//     interface String {
//         capitalize(): string;
//     }
// }
//
// String.prototype.capitalize = function () {
//     return this.charAt(0).toUpperCase() + this.slice(1);
// };
//
// export {}

const capitalize = (v: string): string => {
    return v.charAt(0).toUpperCase() + v.slice(1);
}

export {capitalize}