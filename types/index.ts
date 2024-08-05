import { Role } from "@prisma/client"

export interface allManufacturersProps {
    id:             string
    name:           string
    models:         string[]
}

export interface allCategoriesProps {
    categoryId:     string
    name:           string | undefined
}

export interface CategoriesProps {
    id:             string
    categoryId:     string
    name:           string
    technical:      JSON
    createdAt:      Date
    updatedAt:      Date
    partId:         String | undefined
}

export interface SafeUser {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    hashedPassword: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}