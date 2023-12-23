import "./Home.css";
import { Header } from "../../components/Header/Header";
import { UsersList } from "../../components/Users/UsersList";
import { AsideUpdateMenu } from "../../components/AsideUpdateMenu/AsideUpdateMenu";

export const Home = () => {
  return (
    <div>
      <AsideUpdateMenu />
      <Header />
      <div className="container home__wrapper">
        <h1 className="title">Другие пользователи:</h1>
        <UsersList />
      </div>
    </div>
  );
};
