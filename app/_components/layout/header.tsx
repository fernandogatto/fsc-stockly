import { ReactNode } from "react";

export const HeaderTitle = ({ children }: { children: ReactNode }) => {
  return <h2 className="text-xl font-semibold">{children}</h2>;
};

export const HeaderSubtitle = ({ children }: { children: ReactNode }) => {
  return (
    <span className="text-xs font-semibold text-gray-500">{children}</span>
  );
};

export const HeaderLeft = ({ children }: { children: ReactNode }) => {
  return <div className="space-y-1">{children}</div>;
};

export const HeaderRight = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-between">{children}</div>
  );
};

export default Header;
