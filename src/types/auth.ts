export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = {
    token: string;
}

export type RegisterRequest = {
    email: string;
    password: string;
}

export type RegisterResponse = {
    isverified: boolean;
    id: number;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}