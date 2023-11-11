import { PropsWithChildren } from "react";

export type PopupProps = PropsWithChildren<{
    isOpened: boolean;
    close: () => void;
}>
