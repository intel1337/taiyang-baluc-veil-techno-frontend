export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    name: string;
}

export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
    name: string;
}


export interface UserResponseDto {
    id: number;
    username: string;
    email: string;
    name: string;
}


export interface UserPublicDto {
    id: number;
    username: string;
    name: string;
}