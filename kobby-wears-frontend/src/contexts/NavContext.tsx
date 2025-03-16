import { createContext, useState } from "react";

export const NavContext = createContext<
  | {
      activeNav: boolean;
      setActiveNav: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

import { ReactNode } from "react";

export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [activeNav, setActiveNav] = useState<boolean>(false);
  return (
    <NavContext.Provider value={{ activeNav, setActiveNav }}>
      {children}
    </NavContext.Provider>
  );
};
