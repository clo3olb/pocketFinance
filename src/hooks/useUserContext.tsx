import { User } from "firebaseConfig/fb";
import { createContext, useContext, useState } from "react";

type UserContextValueType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextValueType>({
  user: null,
  setUser: (user: User | null) => {},
});

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);
export default useUserContext;
