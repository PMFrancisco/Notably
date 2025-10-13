import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBar } from '../components/molecules/SearchBar'

describe('SearchBar', () => {
  it('renders with placeholder text', () => {
    const mockOnChange = jest.fn()
    render(<SearchBar value="" onChange={mockOnChange} placeholder="Search notes..." />)
    
    const input = screen.getByPlaceholderText('Search notes...')
    expect(input).toBeInTheDocument()
  })

  it('displays the current value', () => {
    const mockOnChange = jest.fn()
    render(<SearchBar value="test query" onChange={mockOnChange} />)
    
    const input = screen.getByDisplayValue('test query')
    expect(input).toBeInTheDocument()
  })

  it('calls onChange when user types', () => {
    const mockOnChange = jest.fn()
    render(<SearchBar value="" onChange={mockOnChange} />)
    
    const input = screen.getByPlaceholderText('Search notes...')
    fireEvent.change(input, { target: { value: 'new search' } })
    
    expect(mockOnChange).toHaveBeenCalledWith('new search')
  })

  it('shows clear button when value is present', () => {
    const mockOnChange = jest.fn()
    render(<SearchBar value="test" onChange={mockOnChange} />)
    
    const clearButton = screen.getByLabelText('Clear search')
    expect(clearButton).toBeInTheDocument()
  })

  it('does not show clear button when value is empty', () => {
    const mockOnChange = jest.fn()
    render(<SearchBar value="" onChange={mockOnChange} />)
    
    const clearButton = screen.queryByLabelText('Clear search')
    expect(clearButton).not.toBeInTheDocument()
  })

  it('clears value when clear button is clicked', () => {
    const mockOnChange = jest.fn()
    render(<SearchBar value="test query" onChange={mockOnChange} />)
    
    const clearButton = screen.getByLabelText('Clear search')
    fireEvent.click(clearButton)
    
    expect(mockOnChange).toHaveBeenCalledWith('')
  })

  it('renders with custom placeholder', () => {
    const mockOnChange = jest.fn()
    render(<SearchBar value="" onChange={mockOnChange} placeholder="Custom placeholder" />)
    
    const input = screen.getByPlaceholderText('Custom placeholder')
    expect(input).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const mockOnChange = jest.fn()
    const { container } = render(
      <SearchBar value="" onChange={mockOnChange} className="custom-class" />
    )
    
    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('custom-class')
  })
})

