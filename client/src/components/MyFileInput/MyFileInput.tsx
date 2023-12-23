import { FC, useRef, useState } from "react";
import "./MyFileInput.css";

interface IProps {
  label: string;
}

export const MyFileInput: FC<IProps> = ({ label }) => {
  const [value, setValue] = useState<File | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue(file);
  };

  return (
    <div className="input-wrapper">
      <label className="input-label">{label}</label>
      <label className="input-file">
        <input onChange={handleFileChange} type="file" name="image" />
        <span ref={spanRef}>{value ? value.name : "Выберите файл"}</span>
      </label>
    </div>
  );
};
