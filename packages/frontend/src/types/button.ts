export type TThemeButton = "yellow" | "yellow-secondary" | "dark";
export type TSizeButton = "small" | "large";
export type TTypeButton = "headerBtn" | "connectBtn";

export interface IButton {
    title: string
    theme: TThemeButton
    size: TSizeButton
    type?: TTypeButton
    onClick?: () => void
}