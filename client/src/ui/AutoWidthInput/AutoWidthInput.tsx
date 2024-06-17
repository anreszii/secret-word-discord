import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";

interface AutoWidthInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const AutoWidthInput: React.FC<AutoWidthInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [inputWidth, setInputWidth] = useState(1);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth);
    }
  }, [value, placeholder]);

  return (
    <div style={{ height: "44px" }}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: `${inputWidth}px`,
        }}
        className={styles.input}
        autoFocus
      />
      <span
        ref={spanRef}
        style={{
          visibility: "hidden",
          whiteSpace: "pre",
          fontSize: "24px",
          padding: "6px",
          border: "1px solid #ccc",
          position: "absolute",
        }}
        className={styles.span}
      >
        {value || placeholder}
      </span>
    </div>
  );
};
