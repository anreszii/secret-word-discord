import { Loader } from "src/components";
import { discordService } from "src/shared/services/DiscordService";
import { gameService } from "src/shared/services/GameService";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socketService } from "src/shared/services/SocketService";
import { observer } from "mobx-react-lite";

export const GamePage = observer(() => {
  const { loading, word, scout, time, endGame, simpleEndGame } = gameService;
  const { users, getLinkPhoto, me } = discordService;
  const { socket } = socketService;
  const [timeGame, setTimeGame] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setTimeGame(
      time.split(":")[1] === "0"
        ? `${time.split(":")[0]}:${time.split(":")[1]}0`
        : time
    );

    socket.on("endGame", () => {
      navigate("/");
      simpleEndGame();
    });

    return () => {
      socket.off("endGame");
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      const intervalId = setInterval(() => {
        setTimeGame((prevTime) => {
          const [minutes, seconds] = prevTime.split(":").map(Number);
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(intervalId);
              return "0:00";
            } else {
              return `${minutes - 1}:59`;
            }
          } else {
            return `${minutes}:${
              (seconds - 1).toString().length === 1
                ? `0${seconds - 1}`
                : seconds - 1
            }`;
          }
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [loading]);

  const handleEndGame = () => {
    endGame();
    navigate("/");
  };

  return (
    <>
      {loading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <div className={styles.game}>
          <div className={styles.game__players}>
            {users.map((user) => (
              <img src={getLinkPhoto(user.id, user.avatar)} />
            ))}
          </div>
          <div className={styles.game__info}>
            <div className={styles.game__info__role}>
              Role: {me?.id === scout?.id ? "Scout" : "Peaceful"}
            </div>
            {me?.id !== scout?.id && (
              <div className={styles.game__info__word}>Word: {word}</div>
            )}
            <div className={styles.game__info__time}>Time: {timeGame}</div>
            <div className={styles.game__info__hint}>
              {me?.id === scout?.id
                ? "Your task is to figure out the word and name it, and also not to give yourself away"
                : "Your task is to identify the scout and not give him his word"}
            </div>
          </div>
          <button className={styles.game__exit} onClick={handleEndGame}>
            Exit
          </button>
        </div>
      )}
    </>
  );
});
