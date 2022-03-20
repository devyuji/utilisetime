import { useContext } from "react";
import { FC, FormEventHandler, useState } from "react";
import Modal from ".";
import {
  AddContext,
  isSingleDigit,
  TotalTimeContext,
  UpdateTimeContext,
} from "../context";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

interface TimingProps {
  handleClose: () => void;
}

const TimingModal: FC<TimingProps> = ({ handleClose }) => {
  const [text, setText] = useState<string>("");
  const [hr, setHr] = useState<number>(0);
  const [min, setMin] = useState<number>(0);

  const addData = useContext(AddContext);

  const totalTime = useContext(TotalTimeContext);

  const updateTime = useContext(UpdateTimeContext);

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const totalTimeHr = parseInt(totalTime.hr);
    const totalTimeMin = parseInt(totalTime.min);

    if (totalTimeHr === 0 && totalTimeMin === 0) {
      toast("You don't have time!", {
        style: {
          backgroundColor: "#212121",
          fontSize: "1.2rem",
        },
        progressStyle: {
          backgroundImage: "linear-gradient(to right, #833ab4, #fd1d1d)",
        },
        position: "bottom-right",
      });
      return;
    }

    let newHr = totalTimeHr - hr;
    let newMin = totalTimeMin - min;

    if (newMin < 0) {
      newMin = newMin + 60;
      newHr = newHr - 1;
    }

    if (newMin < 0 || newHr < 0) {
      toast("You don't have time!", {
        style: {
          backgroundColor: "#212121",
          fontSize: "1.2rem",
        },
        progressStyle: {
          backgroundImage: "linear-gradient(to right, #833ab4, #fd1d1d)",
        },
        position: "bottom-right",
      });

      return;
    }

    updateTime({
      hr: isSingleDigit(`${newHr}`) ? `0${newHr}` : `${newHr}`,
      min: isSingleDigit(`${newMin}`) ? `0${newMin}` : `${newMin}`,
    });

    addData({
      label: text,
      time: `${isSingleDigit(`${hr}`) ? `0${hr}` : `${hr}`} : ${
        isSingleDigit(`${min}`) ? `0${min}` : `${min}`
      }`,
    });

    handleClose();
  };

  return (
    <Modal handleClose={handleClose}>
      <div className="timing_container">
        <h1 className="heading">Add your task</h1>
        <form onSubmit={submit} className="form">
          <label htmlFor="one">Task name</label>
          <input
            id="one"
            type="text"
            placeholder="eg. studying..."
            onChange={(e) => setText(e.target.value)}
            autoComplete="off"
            required
          />
          <label htmlFor="two">How much time does it take?</label>
          <div className="time_input">
            <input
              id="two"
              type="number"
              min={0}
              max={24}
              placeholder="Hr."
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (isNaN(val)) {
                  return setHr(0);
                }
                setHr(val);
              }}
            />
            <input
              id="two"
              type="number"
              min={0}
              max={60}
              placeholder="Min."
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (isNaN(val)) {
                  return setMin(0);
                }
                setMin(val);
              }}
            />
          </div>

          <div className="action_button">
            <motion.button type="submit" whileTap={{ scale: 0.9 }}>
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Add
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={handleClose}
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Cancel
            </motion.button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TimingModal;
