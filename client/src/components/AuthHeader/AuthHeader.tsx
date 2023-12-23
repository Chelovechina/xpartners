import { FC } from "react";
import { NavLink } from "react-router-dom";

export const AuthHeader: FC = () => {
  return (
    <header className="header">
      <div className="container header__wrapper">
        <NavLink className="btn" to="/registration">
          Регистрация
        </NavLink>
        <NavLink className="btn" to="/login">
          Войти
        </NavLink>
      </div>
    </header>
  );
};
