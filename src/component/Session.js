import React, { useContext } from "react";

const SessionContext = React.createContext({
  user: undefined,
  setUser: () => {},
});

export default SessionContext

export const useSession = () => {
  const { user } = useContext(SessionContext);
  return user;
};
