import Modal from "react-modal";
type TAlertModalProps = {
  title: string;
  describe: string;
  isOpen: boolean;
  children: React.ReactNode;
  onRequestClose?: () => void;
};
export default function AlertModal({
  children,
  describe,
  isOpen,
  title,
  onRequestClose,
}: TAlertModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      className="relative w-full bg-white rounded-md max-auto mt-14 flex p-4 container lg:w-1/4 items-center justify-center flex-col text-black"
      onRequestClose={onRequestClose}
    >
      <div className="text-xl font-bold">{title}</div>
      <div>{describe}</div>
      {children}
    </Modal>
  );
}
