import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
    ok: true,
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('displays empty state message when no todos', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
      ok: true,
    })
  );

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });
});

test('displays correct stats for incomplete and completed todos', async () => {
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
  ];

  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockTodos),
      ok: true,
    })
  );

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/2 items left/i)).toBeInTheDocument();
  });
  
  expect(screen.getByText(/1 completed/i)).toBeInTheDocument();
});

test('delete button calls API with correct todo id', async () => {
  const mockTodos = [
    { id: 1, title: 'Todo to delete', completed: false },
  ];

  global.fetch
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTodos),
        ok: true,
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'Deleted' }),
        ok: true,
      })
    );

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await screen.findByText('Todo to delete');
  
  // Find and click the delete button using its aria-label
  const deleteButton = screen.getByRole('button', { name: /delete todo/i });
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});
