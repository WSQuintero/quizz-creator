import { ButtonHTMLAttributes } from "react";

interface GeneralButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}