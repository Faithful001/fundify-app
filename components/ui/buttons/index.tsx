import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

interface BaseButtonProps {
  className?: string;
  variant?: "solid" | "outline";
  bgColor?: string;
  borderColor?: string;
}

interface LinkButtonProps extends BaseButtonProps {
  type: "link";
  href: string;
  children: React.ReactNode;
}

interface ButtonElementProps
  extends BaseButtonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  type: "submit" | "button" | "reset";
  children: React.ReactNode;
}

function isLinkButtonProps(
  props: LinkButtonProps | ButtonElementProps
): props is LinkButtonProps {
  return props.type === "link";
}

const Button = ({
  className,
  variant = "solid",
  borderColor,
  bgColor,
  ...props
}: LinkButtonProps | ButtonElementProps) => {
  if (isLinkButtonProps(props)) {
    const { href, ...restProps } = props;
    return (
      <Link
        href={href}
        className={`${className} ${
          variant === "solid"
            ? "bg-primary text-white"
            : variant === "outline"
            ? "bg-transparent border border-primary text-primary duration-500 transition-all"
            : ""
        } rounded-md p-2 px-3 font-normal flex items-center justify-center gap-[5px]`}
        {...restProps}
        style={{
          borderWidth: borderColor && "1px",
          borderColor,
          backgroundColor: bgColor,
        }}
      >
        {props.children}
      </Link>
    );
  }

  const { type, ...restProps } = props;
  return (
    <button
      type={type as "submit" | "button" | "reset"}
      className={`${className} ${
        variant === "solid"
          ? "bg-primary text-white"
          : variant === "outline"
          ? "bg-transparent border border-primary text-primary duration-500 transition-all"
          : ""
      } rounded-md p-2 px-3 font-normal flex items-center justify-center gap-[5px]`}
      {...restProps}
      style={{
        borderWidth: borderColor && "1px",
        borderColor,
        backgroundColor: bgColor,
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
