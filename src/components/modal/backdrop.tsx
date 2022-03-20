import { FC } from "react";
import { motion, Variants } from "framer-motion";

interface BackDropProps {
  onClick: () => void;
}

const BackDrop: FC<BackDropProps> = ({ children, onClick }) => {
  const opacity: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={opacity}
      animate="visible"
      initial="hidden"
      exit="hidden"
      className="backdrop"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default BackDrop;
