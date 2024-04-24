export interface ApiResponse<T> {
    data: T;
}

export interface Role {
    id?: number;
    name: string;
    description?: string;
}

export interface AppUserData {
    id?: number;
    username: string;
    email?: string;
    accesstoken?: string;
    roles?: Role[];
}

export interface ConsumerCompany {
    id?: number;
    name?: string;
    description?: string;
    website?: string;
    domain?: string;
    title?: string;
}

export interface Branding {
    id?: number;
    banner?: string;
    introtext?: string;
    logosmall?: string;
    logolarge?: string;
}