/// <reference types="vite/client" />

export type Operation = "+" | "-" | "/" | "x";
export type Number = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type Special = "." | "=" | "c" | "ce" | "%";

export type BtnPressed = Special | Operation | Number;
