import { FC } from "react";
import "./UsersList.css";
import { useFetchAllUsersQuery } from "../../services/UserService";
import { UserItem } from "./UserItem";

export const UsersList: FC = () => {
  const { data: users } = useFetchAllUsersQuery(undefined);

  if (!users) return <></>;

  return (
    <div className="users__list">
      {users.map((user: IUser) => (
        <UserItem key={user._id} user={user} />
      ))}
    </div>
  );
};
