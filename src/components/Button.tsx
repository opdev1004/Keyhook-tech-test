"use client";

import { useRouter } from "next/navigation";

interface Props {
  children: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const Button = ({ children, href, onClick, className = "" }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick();
    if (href) router.push(href);
  };

  return (
    <button
      className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
