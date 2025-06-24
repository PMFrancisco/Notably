import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock webextension-polyfill
jest.mock('webextension-polyfill');

describe('Notably App', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the Notably popup without crashing', async () => {
    render(<App />);
    
    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText('Notably')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays the current URL after loading', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('https://example.com')).toBeInTheDocument();
    });
  });

  it('has input fields for title and note', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Note title (optional)')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Write your note here...')).toBeInTheDocument();
    });
  });

  it('has a save button that is initially disabled', async () => {
    render(<App />);
    
    await waitFor(() => {
      const saveButton = screen.getByText('Save Note');
      expect(saveButton).toBeInTheDocument();
      expect(saveButton).toBeDisabled();
    });
  });

  it('enables save button when user types in note field', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Write your note here...')).toBeInTheDocument();
    });

    const noteTextarea = screen.getByPlaceholderText('Write your note here...');
    await user.type(noteTextarea, 'This is a test note');

    const saveButton = screen.getByText('Save Note');
    expect(saveButton).toBeEnabled();
  });

  it('enables save button when user types in title field', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Note title (optional)')).toBeInTheDocument();
    });

    const titleInput = screen.getByPlaceholderText('Note title (optional)');
    await user.type(titleInput, 'Test Title');

    const saveButton = screen.getByText('Save Note');
    expect(saveButton).toBeEnabled();
  });
});
