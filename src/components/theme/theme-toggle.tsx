"use client"

import { useTheme } from './theme-provider'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative h-9 w-9 p-0 theme-transition hover:bg-surface-alt/80 group"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon for light mode */}
      <Icons.sun className={`
        h-4 w-4 absolute transition-all duration-300 ease-in-out
        ${theme === 'dark' 
          ? 'scale-0 rotate-90 opacity-0' 
          : 'scale-100 rotate-0 opacity-100'
        }
      `} />
      
      {/* Moon icon for dark mode */}
      <Icons.moon className={`
        h-4 w-4 absolute transition-all duration-300 ease-in-out
        ${theme === 'dark' 
          ? 'scale-100 rotate-0 opacity-100' 
          : 'scale-0 -rotate-90 opacity-0'
        }
      `} />
      
      {/* Glow effect on hover */}
      <div className={`
        absolute inset-0 rounded-md bg-bitcoin/20 opacity-0 transition-opacity duration-300
        group-hover:opacity-100
      `} />
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 