export interface DislogOption {
  title?: string;
  message: string;
  closeOnClickModel?: boolean;
  option: "confirm" | "cancel-confirm";
  onConfirm?(): void;
  onCancel?(): void;
  onClose?(): void;
}
