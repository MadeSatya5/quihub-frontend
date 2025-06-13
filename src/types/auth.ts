export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type GetMeResponse = {
  payload: {
    id: string;
    email: string;
    iat: number;
    exp: number;
  };
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  isverified: boolean;
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};
