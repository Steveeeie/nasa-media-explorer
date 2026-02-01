import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";
import { classNames } from "@eulersoft/classnames";

interface SharedProps {
  variant?: "secondary" | "primary";
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & SharedProps;

function Button({ variant = "secondary", ...rest }: ButtonProps) {
  return (
    <button className={classNames(styles.button, styles[variant])} {...rest} />
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & SharedProps;

function LinkButton({ variant = "secondary", ...rest }: LinkButtonProps) {
  return <a className={classNames(styles.button, styles[variant])} {...rest} />;
}

export { Button, LinkButton };
