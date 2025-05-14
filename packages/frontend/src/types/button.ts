export type TThemeButton = "yellow" | "yellow-secondary" | "dark" | "dark-secondary";
export type TSizeButton = "small" | "large";
export type TTypeButton = "headerBtn" | "connectBtn";

export interface IButton {
    title: string
    theme: TThemeButton
    size: TSizeButton
    type?: "button" | "reset" | "submit";
    btnType?: TTypeButton
    onClick?: () => void
}