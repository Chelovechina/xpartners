import { ChangeEvent, FC } from "react";
import "./MyInput.css";
import { useAppDispatch } from "../../hooks/redux";

interface IProps {
  type: string;
  placeholder: string;
  value: string | number;
  setValue: Function;
  label: string;
  name: string;
}

export const MyInput: FC<IProps> = ({
  type,
  placeholder,
  value,
  setValue,
  label,
  name,
}) => {
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setValue(e.target.value));
  };

  return (
    <div className="input-wrapper">
      <label className="input-label">{label}</label>
      <input
        required
        className="input"
        onChange={handleChange}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};
