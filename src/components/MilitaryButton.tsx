import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface MilitaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const MilitaryButton = forwardRef<HTMLButtonElement, MilitaryButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          "military-subtext font-semibold uppercase tracking-widest transition-all duration-300",
          "border rounded-sm transform hover:scale-105",
          {
            // Primary variant (neon green)
            'btn-military neon-border neon-glow hover:bg-primary hover:text-primary-foreground': variant === 'primary',
            
            // Secondary variant (military surface)
            'bg-card border-border text-card-foreground hover:bg-secondary hover:text-secondary-foreground': variant === 'secondary',
            
            // Danger variant (red alert)
            'btn-danger': variant === 'danger',
            
            // Ghost variant (transparent)
            'bg-transparent border-border text-foreground hover:bg-card': variant === 'ghost',
            
            // Size variants
            'px-3 py-2 text-xs': size === 'sm',
            'px-6 py-3 text-sm': size === 'md',
            'px-8 py-4 text-base': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

MilitaryButton.displayName = "MilitaryButton";

export { MilitaryButton };