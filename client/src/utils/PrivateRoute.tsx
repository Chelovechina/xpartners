import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { FC, ReactNode } from "react";

export const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAppSelector((state) => state.userReducer);

  if (!user) return <Navigate to="/login" replace />;

  return children;
};
