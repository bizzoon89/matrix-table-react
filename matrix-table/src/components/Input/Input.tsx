import cn from 'classnames';
import type { InputHTMLAttributes, DetailedHTMLProps } from 'react';

interface IInput extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  className?: string;
}

export const Input = ({ label, className, ...props }: IInput) => {
  return (
    <div className='flex flex-col gap-1 w-full'>
      {label && (
        <label
          htmlFor={props.id}
          className='text-sm font-medium'
        >
          {label}
        </label>
      )}
      <input
        className={cn(
          'border min-w-[150px] rounded-md px-2 py-1 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors h-[36px]',
          className
        )}
        {...props}
      />
    </div>
  );
};
