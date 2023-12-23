import { FC, FormEvent, useRef } from "react";
import "./Registration.css";
import { AuthHeader } from "../../components/AuthHeader/AuthHeader";
import { MyInput } from "../../components/MyInput/MyInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setDay,
  setEmail,
  setGender,
  setMonth,
  setName,
  setPassword,
  setYear,
} from "../../store/reducers/FormReducer";
import { MySelect } from "../../components/MySelect/MySelect";
import { genders, monthes } from "../../utils/constants";
import { MyFileInput } from "../../components/MyFileInput/MyFileInput";
import { useRegistrationMutation } from "../../services/AuthService";
import { setCredentials } from "../../store/reducers/UserReducer";
import { useNavigate } from "react-router-dom";

export const Registration: FC = () => {
  const form = useAppSelector((state) => state.formReducer);
  const [registration, { isError }] = useRegistrationMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | undefined>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response: any = await registration(
      new FormData(e.target as HTMLFormElement)
    );

    if (response.data) {
      dispatch(setCredentials(response.data));
      navigate("/");
    }
  };

  return (
    <>
      <AuthHeader />
      <p className={isError ? "error__message active" : "error__message"}>
        Пользователь с таким email уже существует
      </p>
      <div className="container auth__wrapper">
        <h1 className="title">Регистрация</h1>
        <form
          onSubmit={handleSubmit}
          className="form"
          encType="multipart/form-data"
        >
          <div className="form__wrapper">
            <MyInput
              type="text"
              placeholder="Имя"
              label="Имя:"
              value={form.name}
              setValue={setName}
              name="name"
            />
            <MyInput
              type="text"
              placeholder="Email"
              label="Email:"
              value={form.email}
              setValue={setEmail}
              name="email"
            />
            <MyInput
              type="password"
              placeholder="Пароль"
              label="Пароль:"
              value={form.password}
              setValue={setPassword}
              name="password"
            />
            <div className="form__birthday">
              <MyInput
                type="number"
                placeholder="День"
                label="День:"
                value={form.day}
                setValue={setDay}
                name="day"
              />
              <MySelect
                options={monthes}
                selectedOption={form.month}
                setValue={setMonth}
                label="Месяц:"
                name="month"
              />
              <MyInput
                type="number"
                placeholder="Год"
                label="Год:"
                value={form.year}
                setValue={setYear}
                name="year"
              />
            </div>
            <MySelect
              options={genders}
              selectedOption={form.gender}
              setValue={setGender}
              label="Пол:"
              name="gender"
            />
            <MyFileInput label="Загрузите аватар:" />
          </div>
          <button type="submit" className="submit">
            Создать аккаунт
          </button>
        </form>
      </div>
    </>
  );
};
