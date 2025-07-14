import { useState, useEffect } from 'react'

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

  return (
    <div className={`flex gap-1 ${className}`}>
      {themes.map(theme => (
        <button
          key={theme.id}
          onClick={() => handleThemeChange(theme.id)}
          className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${
            currentTheme === theme.id ? 'border-foreground' : 'border-transparent'
          }`}
          style={{ backgroundColor: theme.color }}
          title={`Switch to ${theme.name} theme`}
        />
      ))}
    </div>
  )
} 