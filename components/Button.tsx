import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative font-heading uppercase tracking-wider font-bold py-4 px-10 transition-all duration-500 rounded-full flex items-center justify-center gap-2 group active:scale-95";
  
  const variants = {
    primary: "bg-neon-blue text-black border border-neon-blue hover:text-white hover:border-white/50",
    secondary: "bg-white text-black border border-white hover:text-white hover:border-white/50",
    outline: "bg-white/5 border border-white/20 text-white backdrop-blur-md hover:border-neon-orange hover:text-neon-orange"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <div className={`relative ${widthClass}`}>
      {/* Glow Effect behind button */}
      <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none 
        ${variant === 'primary' ? 'bg-neon-blue' : variant === 'secondary' ? 'bg-white' : 'bg-neon-orange'}`}>
      </div>
      
      <button 
        className={`${baseStyles} ${variants[variant]} ${widthClass} ${className} relative overflow-hidden z-10`}
        {...props}
      >
        {/* Liquid Shimmer */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none skew-x-12"></div>
        
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    </div>
  );
};