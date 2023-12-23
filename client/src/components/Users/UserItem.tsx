import { FC } from "react";

interface IProps {
  user: IUser;
}

export const UserItem: FC<IProps> = ({ user }) => {
  const calculateAge = (birthdate: Date): number => {
    const today = new Date();
    const birthyear = birthdate.getFullYear();
    const thisYear = today.getFullYear();

    let age = thisYear - birthyear;

    if (today < new Date(thisYear, birthdate.getMonth(), birthdate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div className="item">
      <img
        className="item__img"
        src={`http://localhost:3000/${user.imageUrl}`}
      />
      <div className="item__info">
        <p className="item__text">Имя: {user.name}</p>
        <p className="item__text">
          Возраст: {calculateAge(new Date(user.birthDate))}
        </p>
      </div>
    </div>
  );
};
