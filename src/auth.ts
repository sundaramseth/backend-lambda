interface AuthInput {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export const handler = async (event: AuthInput): Promise<AuthResponse> => {
  const { email, password } = event;

  if (!email || !password) {
    return {
      success: false,
      error: 'Invalid email or password'
    };
  }

  if (!email.includes('@') || password.length < 8) {
    return {
      success: false,
      error: 'Invalid email or password'
    };
  }

  return {
    success: true,
    token: 'mockToken123'
  };
};