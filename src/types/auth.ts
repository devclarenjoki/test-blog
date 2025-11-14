// src/types/auth.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Reader' | 'Author' | 'Editor' | 'Admin';
  avatarUrl?: string; // Optional avatar URL
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}