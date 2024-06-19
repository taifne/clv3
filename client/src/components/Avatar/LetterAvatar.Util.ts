import { isEmpty, isString } from "lodash";

const DEFAULT_COLOR = "#552F72";
const COLORS: Record<string, string> = {
    A: "#719a31",
    B: "#1628ab",
    C: "#93711d",
    D: "#b4a67f",
    E: "#2c2a1a",
    F: "#a8bf0b",
    G: "#5a3877",
    H: "#42365f",
    I: "#5006ca",
    J: "#18cce8",
    K: "#3f3e03",
    L: "#277634",
    M: "#4a1a00",
    N: "#FF0000",
    O: "#256437",
    P: "#aeda09",
    Q: "#000000",
    R: "#6fa5e6",
    S: "#88da77",
    T: "#88da77",
    U: "#cf17ba",
    V: "#6b88ef",
    W: "#9d69ab",
    X: "#76b2d7",
    Y: "#1e38f3",
    Z: "#fa2947"
};

export const getColorByName = (name: string): string => {
    return COLORS[name.charAt(0).toUpperCase()] ?? DEFAULT_COLOR;
};

export const getName = (name: string): string => {
    if (!isString(name) || isEmpty(name)) {
        return "Unknown";
    }

    const words = name.split(" ").map(word => word.trim()).filter(word => word.length);

    if (words.length >= 2) {
        return `${words[0].charAt(0)}${words[words.length - 1].charAt(0)}`.toUpperCase();
    }

    return words[0].substring(0, 2).toUpperCase();
};


export const getLetterAvatar = (name: string): { name: string, label: string, color: string } => {
    const letterOnBeHalf = getName(name);
    const color = getColorByName(letterOnBeHalf);
    return {
        name: letterOnBeHalf,
        label: name,
        color
    };
};
