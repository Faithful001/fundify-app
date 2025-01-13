import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  bgColor?: string;
  borderColor?: string;
}

const Textarea = ({
  className,
  bgColor = "#1E222D",
  borderColor,
  ...restProps
}: TextareaProps) => {
  return (
    <textarea
      className={`${className} p-3 outline outline-1 outline-white/40 rounded-md placeholder:text-light-gray text-sm focus:outline-primary focus:outline focus-outline-1`}
      style={{ backgroundColor: bgColor, borderColor }}
      {...restProps}
    />
  );
};

export default Textarea;
