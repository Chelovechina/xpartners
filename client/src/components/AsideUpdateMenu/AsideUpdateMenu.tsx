import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import "./AsideUpdateMenu.css";
import closeSrc from "../../assets/close.svg";
import { setIsModalOpen } from "../../store/reducers/FormReducer";
import { UpdateUser } from "../UpdateUser/UpdateUser";

export const AsideUpdateMenu = () => {
  const isModalOpen: boolean = useAppSelector(
    (state) => state.formReducer.isModalOpen
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setIsModalOpen(false));
  };

  return (
    <div className={isModalOpen ? "modal active" : "modal"}>
      <div onClick={handleClose} className="modal__wrapper" />
      <div className="modal__inner">
        <button className="modal__btn">
          <img
            onClick={handleClose}
            className="modal__close"
            src={closeSrc}
            alt="Закрыть"
          />
        </button>
        <UpdateUser />
      </div>
    </div>
  );
};
