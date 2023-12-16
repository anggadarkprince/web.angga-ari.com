"use server"

import {API_URL} from "@/app/utility/constants";
import {cookies} from "next/headers";
import {ContactType as Contact, PaginationMetaType} from "@/app/types";

export interface ContactType extends Contact {
    created_at?: string,
    updated_at?: string | null,
}

export interface ContactResponse {
    data: ContactType[];
    meta: PaginationMetaType;
}
export const fetchAllMessages = async (filters: Record<string, string>) => {
    const response = await fetch(`${API_URL}contacts?${new URLSearchParams(filters)}`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${cookies().get("access_token")?.value}`
        },
        credentials: "include",
    });
    return await response.json() as ContactResponse;
}

export const fetchMessage = async (id: number) => {
    const response = await fetch(`${API_URL}contacts/${id}`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${cookies().get("access_token")?.value}`
        },
        credentials: "include",
    });
    const result = await response.json();
    return result.data as ContactType;
}

export const replyMessage = async (id: number, data: {subject: string; message: string}) => {
    const response = await fetch(`${API_URL}contacts/${id}/reply`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json",
            Authorization: `Bearer ${cookies().get("access_token")?.value}`
        },
        credentials: "include",
    });
    const result = await response.json();
    return result.data as ContactType;
}

export const rejectMessage = async (id: number) => {
    const response = await fetch(`${API_URL}contacts/${id}/reject`, {
        method: 'PATCH',
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json",
            Authorization: `Bearer ${cookies().get("access_token")?.value}`
        },
        credentials: "include",
    });
    const result = await response.json();
    return result.data as ContactType;
}

export const holdMessage = async (id: number) => {
    const response = await fetch(`${API_URL}contacts/${id}/hold`, {
        method: 'PATCH',
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json",
            Authorization: `Bearer ${cookies().get("access_token")?.value}`
        },
        credentials: "include",
    });
    const result = await response.json();
    return result.data as ContactType;
}

export const deleteMessage = async (id: number) => {
    const response = await fetch(`${API_URL}contacts/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${cookies().get("access_token")?.value}`
        },
        credentials: "include",
    });
    return response.status === 204 ? null : await response.json();
}