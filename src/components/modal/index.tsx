import { FC } from "react";
import BackDrop from "./backdrop";
import { motion } from "framer-motion";

interface ModalProps {
  handleClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, handleClose }) => {
  return (
    <BackDrop onClick={handleClose}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
        }}
        exit={{ scale: 0 }}
        className="modal_container"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </BackDrop>
  );
};

export default Modal;
