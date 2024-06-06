import Modal from "react-modal";
import { Button } from "./ui/button";
export type TAlertModalProps = {
  title: string;
  description: string;
  isOpen: boolean;
  onRequestClose?: () => void;
  onConfirm?: () => Promise<void>;
  onClose?: () => void;
  isloading?: boolean;
};

export default function AlertModal({
  description,
  isOpen,
  title,
  onRequestClose,
  onClose,
  onConfirm,
  isloading
}: TAlertModalProps) {
  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (isMounted) return null;

  return (
    <Modal
      isOpen={isOpen}
      className="relative w-full bg-white rounded-md max-auto mt-14 flex p-4 container lg:w-1/4 items-center justify-center flex-col text-black"
      onRequestClose={onRequestClose}
    >
      <div className="text-xl font-bold">{title}</div>
      <div>{description}</div>
      <div className="space-x-4">
        <Button disabled={isloading} variant="default" onClick={onConfirm}>
          Yes
        </Button>
        <Button variant="destructive" onClick={onClose}>
          No
        </Button>
      </div>
    </Modal>
  );
}
