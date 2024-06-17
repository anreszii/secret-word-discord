import { AutoWidthInput, Popup } from "src/ui";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { socketService } from "src/shared/services/SocketService";
import { gameService } from "src/shared/services/GameService";

interface PackPopupProps {
  opened: boolean;
  handleClose: () => void;
}

const PackPopup: React.FC<PackPopupProps> = ({ opened, handleClose }) => {
  const { socket, syncPack } = socketService;
  const { setPack } = gameService;

  const [inputs, setInputs] = useState([""]);
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    socket.on("pack", (pack: string[]) => {
      setInputs([...pack, values[-1]]);
      setPack([...pack, values[-1]]);
    });
  }, []);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value.replaceAll(" ", "");
    setInputs(newInputs);

    if (event.target.value.endsWith(" ")) {
      const newValues = [...values, event.target.value.replaceAll(" ", "")];
      setValues(newValues);
      setInputs([...newInputs, ""]);
      syncPack(newInputs);
      setPack(newInputs);
    }
  };

  return (
    <Popup opened={opened} handleClose={handleClose}>
      <div className={styles.pack}>
        <div className={styles.pack__title}>Pack</div>
        <div className={styles.pack__inputs}>
          {inputs.map((input, index) => (
            <div
              className={styles.pack__inputs__container}
              style={{ height: "44px" }}
            >
              <AutoWidthInput
                key={index}
                value={input}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          ))}
        </div>
      </div>
    </Popup>
  );
};

export default PackPopup;
