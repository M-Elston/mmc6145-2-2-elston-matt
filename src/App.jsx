import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [previousTime, setPreviousTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const gameStart = () => {
    timerReset();
    timerStart();
    setGameActive(true);
  }

  const gameEnd = () => {
    timerStop();
    setGameActive(false);
    setPreviousTime(time);
    setBestTime(prevBest =>
      prevBest === null || time < prevBest ? time : prevBest
    );
  }

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        time={gameActive ? time : null}
        previousTime={!gameActive ? previousTime : null}
        bestTime={bestTime}
        openModal={() => setShowModal(true)}
      />
      <CardGame
        // add onGameStart, onGameEnd props
        cardTexts={cardTexts}
        onGameStart={gameStart}
        onGameEnd={gameEnd}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}

