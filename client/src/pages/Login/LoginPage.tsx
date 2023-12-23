import "./LoginPage.css";
import { MyInput } from "../../components/MyInput/MyInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useLoginMutation } from "../../services/AuthService";
import { setEmail, setPassword } from "../../store/reducers/FormReducer";
import { setCredentials } from "../../store/reducers/UserReducer";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthHeader } from "../../components/AuthHeader/AuthHeader";

function App() {
  const { email, password } = useAppSelector((state) => state.formReducer);
  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response: any = await login({
      email,
      password,
    });

    if (response.data) {
      dispatch(setCredentials(response.data));
      navigate("/");
    }
  };

  return (
    <>
      <AuthHeader />
      <p className={error ? "error__message active" : "error__message"}>
        Неверный логин или пароль
      </p>
      <div className="container auth__wrapper">
        <h1 className="title">Вход</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form__wrapper">
            <MyInput
              type="text"
              placeholder="Email"
              label="Email:"
              value={email}
              setValue={setEmail}
            />
            <MyInput
              type="password"
              placeholder="Пароль"
              label="Пароль:"
              value={password}
              setValue={setPassword}
            />
          </div>
          <button type="submit" className="submit">
            Войти в аккаунт
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
