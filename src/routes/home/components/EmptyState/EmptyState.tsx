import type { LucideProps } from "lucide-react";
import type React from "react";

import "./EmptyState.scss";

interface Props {
  text: string;
  icon: React.FC<LucideProps>;
}

export const EmptyState: React.FC<Props> = ({ icon, text }) => {
  const Icon = icon;

  return (
    <div className="emptyState__container">
      <div className="icon">{<Icon />}</div>
      <p className="text">{text}</p>
    </div>
  );
};
