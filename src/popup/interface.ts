export interface PopupProps extends React.PropsWithChildren<{
  isOpened: boolean;
  handleClose: () => void;
}> {}