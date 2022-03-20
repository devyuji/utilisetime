import { FC, useState, useContext } from "react";
import "./App.css";
import { TotalTimeContext } from "./components/context";
import TimingModal from "./components/modal/timing";
import Navbar from "./components/navbar";
import Card from "./components/card";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  const [planTime, setPlanTime] = useState(false);

  const totalTime = useContext(TotalTimeContext);

  return (
    <>
      <Navbar />

      <main className="main_container">
        <div className="text_container">
          <h1>You have</h1>
          <h2 className="time">
            {totalTime.hr}hr. : {totalTime.min}min.
          </h2>

          <div className="action_btn">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              type="button"
              onClick={() => setPlanTime(true)}
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Add your Task
            </motion.button>
            <h1>Utilise time properly</h1>
          </div>
        </div>

        <Card />
      </main>
      <AnimatePresence>
        {planTime && <TimingModal handleClose={() => setPlanTime(false)} />}
      </AnimatePresence>

      <ToastContainer />
    </>
  );
};

export default App;
