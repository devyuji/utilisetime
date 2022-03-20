import { FC, useContext } from "react";
import { DataContext, DeleteDataContext } from "./context";
import { motion } from "framer-motion";

const Card: FC = () => {
  const data = useContext(DataContext);
  const deleteData = useContext(DeleteDataContext);

  if (data.length === 0) return null;

  return (
    <div className="card_container">
      {data.map((d, index) => (
        <motion.div
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          exit={{ scale: 0 }}
          key={`${index}`}
          className="card"
        >
          <h1>{d.time}</h1>
          <p>{d.label}</p>
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => deleteData(index, d.time)}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
};

export default Card;
