export type ToastType = "info" | "danger" | "success" | "warning";

export interface ToastOption {
  message: string;
  type?: ToastType;
  top?: number;
  duration?: number;
  onDestroy?: () => void;
  onClose?: () => void;
}

export interface Toast {
  info(msg: string);
  warning(msg: string);
  success(msg: string);
  danger(msg: string);
}
