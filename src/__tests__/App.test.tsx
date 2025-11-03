import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import browser from 'webextension-polyfill';
import { ToastProvider } from '../contexts';

// Mock webextension-polyfill
jest.mock('webextension-polyfill');

// Helper function to render App with ToastProvider
const renderApp = () => {
  return render(
    <ToastProvider>
      <App />
    </ToastProvider>
  );
};

describe('Notably App', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the Notably popup without crashing', async () => {
    renderApp();
    
    // Wait for the component to load and check for main elements
    await waitFor(() => {
      expect(screen.getByText('Notably')).toBeInTheDocument();
      expect(screen.getByTitle('All Notes')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    renderApp();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays the current URL hostname after loading', async () => {
    renderApp();
    
    await waitFor(() => {
      // The app displays the hostname, not the full URL
      expect(screen.getByText('example.com')).toBeInTheDocument();
    });
  });

  it('has input fields for title, note, and tags', async () => {
    renderApp();
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Title (optional)')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Write your note here...')).toBeInTheDocument();
      expect(screen.getByText('+ Add tag')).toBeInTheDocument();
    });
  });

  it('has a save button that is initially disabled', async () => {
    renderApp();
    
    await waitFor(() => {
      const saveButton = screen.getByText(/Save Note/i);
      expect(saveButton).toBeInTheDocument();
      expect(saveButton).toBeDisabled();
    });
  });

  it('enables save button when user types in note field', async () => {
    const user = userEvent.setup();
    renderApp();
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Write your note here...')).toBeInTheDocument();
    });

    const noteTextarea = screen.getByPlaceholderText('Write your note here...');
    await user.type(noteTextarea, 'This is a test note');

    const saveButton = screen.getByText(/Save Note/i);
    expect(saveButton).toBeEnabled();
  });

  it('enables save button when user types in title field', async () => {
    const user = userEvent.setup();
    renderApp();
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Title (optional)')).toBeInTheDocument();
    });

    const titleInput = screen.getByPlaceholderText('Title (optional)');
    await user.type(titleInput, 'Test Title');

    const saveButton = screen.getByText(/Save Note/i);
    expect(saveButton).toBeEnabled();
  });

  it('displays tag badges when tags are entered', async () => {
    const user = userEvent.setup();
    renderApp();
    
    await waitFor(() => {
      expect(screen.getByText('+ Add tag')).toBeInTheDocument();
    });

    // Click "+ Add tag" button to show the input
    const addTagButton = screen.getByText('+ Add tag');
    await user.click(addTagButton);

    // Now the input appears with placeholder "Add tag..."
    const tagsInput = screen.getByPlaceholderText('Add tag...');
    await user.type(tagsInput, 'react{Enter}');
    
    //After first tag, need to click again to add more
    await user.click(screen.getByText('+ Add tag'));
    await user.type(screen.getByPlaceholderText('Add tag...'), 'testing{Enter}');
    
    await user.click(screen.getByText('+ Add tag'));
    await user.type(screen.getByPlaceholderText('Add tag...'), 'javascript{Enter}');

    await waitFor(() => {
      expect(screen.getByText('#react')).toBeInTheDocument();
      expect(screen.getByText('#testing')).toBeInTheDocument();
      expect(screen.getByText('#javascript')).toBeInTheDocument();
    });
  });

  it('navigates to All Notes view when button is clicked', async () => {
    const user = userEvent.setup();
    renderApp();
    
    await waitFor(() => {
      expect(screen.getByTitle('All Notes')).toBeInTheDocument();
    });

    const allNotesButton = screen.getByTitle('All Notes');
    await user.click(allNotesButton);

    await waitFor(() => {
      expect(screen.getByTitle('Back')).toBeInTheDocument();
      expect(screen.getByText('No notes saved yet')).toBeInTheDocument();
      expect(screen.getByText('Export')).toBeInTheDocument();
    });
  });

  it('navigates back from All Notes view to main view', async () => {
    const user = userEvent.setup();
    renderApp();
    
    await waitFor(() => {
      expect(screen.getByTitle('All Notes')).toBeInTheDocument();
    });

    // Navigate to All Notes view
    const allNotesButton = screen.getByTitle('All Notes');
    await user.click(allNotesButton);

    await waitFor(() => {
      expect(screen.getByTitle('Back')).toBeInTheDocument();
    });

    // Navigate back to main view
    const backButton = screen.getByTitle('Back');
    await user.click(backButton);

    await waitFor(() => {
      expect(screen.getByText('Notably')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Title (optional)')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Write your note here...')).toBeInTheDocument();
    });
  });

  it('shows appropriate placeholders for all form fields', async () => {
    renderApp();
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Title (optional)')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Write your note here...')).toBeInTheDocument();
      expect(screen.getByText('+ Add tag')).toBeInTheDocument();
    });
  });

  it('successfully saves a note when save button is clicked', async () => {
    const user = userEvent.setup();
    const mockStorage = browser.storage.sync as jest.Mocked<typeof browser.storage.sync>;
    
    renderApp();
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Title (optional)')).toBeInTheDocument();
    });

    // Fill out the form
    const titleInput = screen.getByPlaceholderText('Title (optional)');
    const noteTextarea = screen.getByPlaceholderText('Write your note here...');

    await user.type(titleInput, 'Test Note Title');
    await user.type(noteTextarea, 'This is my test note content');
    
    // Add tags - click button first, then type
    await user.click(screen.getByText('+ Add tag'));
    await user.type(screen.getByPlaceholderText('Add tag...'), 'test{Enter}');
    await user.click(screen.getByText('+ Add tag'));
    await user.type(screen.getByPlaceholderText('Add tag...'), 'note{Enter}');

    // Click save button
    const saveButton = screen.getByText(/Save Note/i);
    expect(saveButton).toBeEnabled();
    await user.click(saveButton);

    // Verify storage was called
    expect(mockStorage.set).toHaveBeenCalledWith({
      'https://example.com': expect.objectContaining({
        title: 'Test Note Title',
        content: 'This is my test note content',
        url: 'https://example.com',
        tags: ['test', 'note'],
        timestamp: expect.any(Number)
      })
    });
  });

  it('loads existing note data when component mounts', async () => {
    const mockStorage = browser.storage.sync as jest.Mocked<typeof browser.storage.sync>;
    const existingNote = {
      title: 'Existing Note',
      content: 'This is an existing note',
      url: 'https://example.com',
      tags: ['existing', 'test'],
      timestamp: Date.now()
    };

    // Mock storage to return existing note
    mockStorage.get.mockResolvedValueOnce({ 'https://example.com': existingNote });

    renderApp();

    await waitFor(() => {
      expect(screen.getByDisplayValue('Existing Note')).toBeInTheDocument();
      expect(screen.getByDisplayValue('This is an existing note')).toBeInTheDocument();
      expect(screen.getByText('#existing')).toBeInTheDocument();
      expect(screen.getByText('#test')).toBeInTheDocument();
    });

    // Button should show "Update Note" instead of "Save Note"
    expect(screen.getByText(/Update Note/i)).toBeInTheDocument();
  });

  it('keeps save button disabled when only tags are entered', async () => {
    const user = userEvent.setup();
    renderApp();
    
    await waitFor(() => {
      expect(screen.getByText('+ Add tag')).toBeInTheDocument();
    });

    // Add a tag - click button first, then type
    await user.click(screen.getByText('+ Add tag'));
    await user.type(screen.getByPlaceholderText('Add tag...'), 'solo-tag{Enter}');

    const saveButton = screen.getByText(/Save Note/i);
    expect(saveButton).toBeDisabled();
  });
});
