import cn from 'classnames';
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface IButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  typeButton?: 'add' | 'delete' | 'submit';
  className?: string;
}

export const Button = ({ typeButton = 'add', children, className, ...props }: IButton) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium text-sm px-4 py-2 transition-colors duration-300 ease-in-out cursor-pointer shadow-sm',
        {
          'bg-green-500 text-white hover:bg-green-600': typeButton === 'add',
          'bg-red-500 text-white hover:bg-red-600': typeButton === 'delete',
          'bg-blue-500 text-white hover:bg-blue-600': typeButton === 'submit',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
