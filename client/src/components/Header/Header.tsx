import { useAppDispatch } from "../../hooks/redux";
import { useLogoutMutation } from "../../services/AuthService";
import { setIsModalOpen } from "../../store/reducers/FormReducer";
import { deleteCredentials } from "../../store/reducers/UserReducer";

export const Header = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    const response: any = await logout(true);

    if (response.data) {
      dispatch(deleteCredentials());
    }
  };

  const handleOpen = () => {
    dispatch(setIsModalOpen(true));
  };

  return (
    <header className="header">
      <div className="container header__wrapper">
        <button onClick={handleLogout} className="btn">
          Выйти
        </button>
        <button onClick={handleOpen} className="btn">
          Изменить информацию
        </button>
      </div>
    </header>
  );
};
