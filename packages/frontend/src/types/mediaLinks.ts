type TTheme = "transparent" | "dark";

export interface IMediaLink {
    id: number,
    name: string,
    path: string
}

export interface IMediaLinksProps {
    theme: TTheme
}