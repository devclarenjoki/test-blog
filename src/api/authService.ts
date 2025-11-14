// src/api/authService.ts

// --- MOCK DATABASE ---
// In a real app, this data would be in a database.
const mockUsers: any = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@author.com',
    role: 'Author',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@editor.com',
    role: 'Editor',
    avatarUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@admin.com',
    role: 'Admin',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704c',
  },
];
// --- END MOCK DATABASE ---

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Simulates a login request to a backend.
 * @param credentials - The user's email and password.
 * @returns A promise that resolves with the user data and a token.
 * @throws An error if the credentials are invalid.
 */
export const login = async (credentials: any): Promise<any> => {
  console.log('Attempting login with:', credentials);
  await delay(1000); // Simulate 1-second network request

  // Find user by email. In a real app, you'd check the password hash.
  const user = mockUsers.find((u: any) => u.email === credentials.email);

  if (!user) {
    // For demo purposes, any password works if the email exists.
    // A real backend would return a generic "Invalid credentials" error.
    throw new Error('Invalid email or password.');
  }

  // Check for a simple mock password for the demo
  if (credentials.password !== 'password') {
    throw new Error('Invalid email or password.');
  }

  // Create a fake JWT token
  const token = btoa(JSON.stringify({ userId: user.id, role: user.role })); // Not a real token!

  console.log('Login successful!');
  return { user, token };
};

/**
 * Simulates a social login request.
 * @param provider - The social provider ('google' or 'github').
 * @returns A promise that resolves with the user data and a token.
 */
export const socialLogin = async (provider: 'google' | 'github'): Promise<any> => {
  console.log(`Attempting social login with ${provider}`);
  await delay(1500); // Simulate a slightly longer social login process

  // In a real app, this would redirect to the provider's OAuth flow.
  // Here, we'll just log in as the first user for simplicity.
  const user = mockUsers[0]; 
  const token = btoa(JSON.stringify({ userId: user.id, role: user.role }));

  console.log(`${provider} login successful!`);
  return { user, token };
};