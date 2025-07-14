import { useState, useEffect, useRef } from 'react'

interface ThemeSelectorProps {
  className?: string
}

export type Theme = 'yellow' | 'pink' | 'blue' | 'green' | 'orange' | 'purple'

const themes: { id: Theme; name: string; color: string }[] = [
  { id: 'yellow', name: 'Yellow', color: '#FFF59D' },
  { id: 'pink', name: 'Pink', color: '#F8BBD9' },
  { id: 'blue', name: 'Blue', color: '#BBDEFB' },
  { id: 'green', name: 'Green', color: '#C8E6C9' },
  { id: 'orange', name: 'Orange', color: '#FFE0B2' },
  { id: 'purple', name: 'Purple', color: '#E1BEE7' },
]

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ className = '' }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('yellow')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const applyTheme = (theme: Theme) => {
    // Remove all theme classes from body
    const allThemeClasses = themes.map(t => `theme-${t.id}`)
    document.body.classList.remove(...allThemeClasses)
    
    // Add the new theme class
    document.body.classList.add(`theme-${theme}`)
    
    // Debug: log what's happening
    console.log('Applied theme:', theme)
    console.log('Body classes:', document.body.classList.toString())
  }

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme)
    applyTheme(theme)
    localStorage.setItem('notably-theme', theme)
    // Don't close dropdown here, only when clicking outside
  }

  const handleCurrentThemeClick = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    // Load saved theme from localStorage or use default
    const savedTheme = (localStorage.getItem('notably-theme') as Theme) || 'yellow'
    console.log('Loading theme:', savedTheme)
    
    if (themes.some(t => t.id === savedTheme)) {
      setCurrentTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      // Fallback to yellow if invalid theme
      setCurrentTheme('yellow')
      applyTheme('yellow')
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const currentThemeData = themes.find(t => t.id === currentTheme)

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Current theme button */}
      <button
        onClick={handleCurrentThemeClick}
        className="w-6 h-6 rounded-full border-2 border-foreground transition-all hover:scale-110 relative z-10 flex items-center justify-center"
        style={{ backgroundColor: currentThemeData?.color }}
        title={`Current theme: ${currentThemeData?.name}. Click to change`}
      />
      
      {/* Dropdown with all themes */}
      <div 
        className={`absolute flex items-center gap-1 transition-all duration-300 ease-out ${
          isOpen 
            ? 'transform translate-x-0 opacity-100' 
            : 'transform translate-x-full opacity-0 pointer-events-none'
        }`}
        style={{
          top: '0px',
          right: '32px', // Move dropdown to the left of the current theme button (24px width + 8px gap)
          height: '24px', // Match the height of the current theme button
          zIndex: 5,
        }}
      >
        {/* All theme options in order */}
        {themes.map((theme, index) => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 flex items-center justify-center ${
              theme.id === currentTheme 
                ? 'border-foreground scale-110' 
                : 'border-transparent hover:border-foreground/50'
            }`}
            style={{ 
              backgroundColor: theme.color,
              transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
            }}
            title={`${theme.id === currentTheme ? 'Current theme: ' : 'Switch to '}${theme.name} theme`}
          />
        ))}
      </div>
    </div>
  )
} 