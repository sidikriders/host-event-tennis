import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** size 'small' makes the PrimaryButton match CasualButton sizing */
  size?: "small" | "normal";
}

const PrimaryButton: React.FC<Props> = ({
  children,
  className = "",
  size = "normal",
  ...rest
}) => {
  const base =
    "btn-primary inline-flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";
  const sizeClasses =
    size === "small"
      ? "btn-primary-small px-3 py-1 rounded text-sm"
      : "px-4 py-2 rounded-lg shadow-sm";

  return (
    <button {...rest} className={`${base} ${sizeClasses} ${className}`}>
      {children}
    </button>
  );
};

export default PrimaryButton;
