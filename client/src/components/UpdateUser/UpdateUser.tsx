import "./UpdateUser.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  clearAll,
  setName,
  setPassword,
} from "../../store/reducers/FormReducer";
import { MyFileInput } from "../MyFileInput/MyFileInput";
import { MyInput } from "../MyInput/MyInput";
import { FormEvent } from "react";
import { useUpdateUserMutation } from "../../services/UserService";

export const UpdateUser = () => {
  const { name, password } = useAppSelector((state) => state.formReducer);
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateUser(new FormData(e.target as HTMLFormElement));
    dispatch(clearAll());
  };

  return (
    <div className="update__wrapper">
      <h1 className="update__title">Изменить профиль</h1>
      <form
        onSubmit={handleSubmit}
        className="form"
        encType="multipart/form-data"
      >
        <div className="update_form__wrapper">
          <MyInput
            type="text"
            placeholder="Имя"
            label="Имя:"
            value={name}
            setValue={setName}
            name="name"
          />
          <MyInput
            type="password"
            placeholder="Пароль"
            label="Пароль:"
            value={password}
            setValue={setPassword}
            name="password"
          />
          <MyFileInput label="Загрузите аватар:" />
        </div>
        <button type="submit" className="submit">
          Сохранить
        </button>
      </form>
    </div>
  );
};
