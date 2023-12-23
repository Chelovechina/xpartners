import { ChangeEvent, FC } from "react";
import "./MySelect.css";
import { useAppDispatch } from "../../hooks/redux";

interface IProps {
  options: IOption[];
  selectedOption: IOption | undefined;
  setValue: Function;
  label: string;
  name: string;
}

export const MySelect: FC<IProps> = ({
  options,
  selectedOption,
  setValue,
  label,
  name,
}) => {
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setValue(options.find((option) => option.value === e.target.value))
    );
  };

  return (
    <div className="input-wrapper">
      <label className="input-label">{label}</label>
      <select
        required
        className="select"
        onChange={handleChange}
        value={selectedOption?.value}
        name={name}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};
