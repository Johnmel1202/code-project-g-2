import { CardProps } from "@/types";

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`${className} shadow card bg-base-100 w-96 `}>
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = "" }: CardProps) => {
  return <div className={`${className} card-body`}>{children}</div>;
};
