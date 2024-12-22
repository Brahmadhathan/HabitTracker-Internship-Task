import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ Icon, ...props }, ref) => {
  return (
    <div className="mt-4 relative rounded-lg border border-gray-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 w-80 md:w-96">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {Icon}
      </div>
      <input
        {...props}
        ref={ref} 
        className="block w-full text-base pl-16 pr-3 py-3 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none"
      />
    </div>
  );
});

Input.displayName = "Input"; 

export default Input;
