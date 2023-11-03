'use server'

import { cookies } from 'next/headers'
import {API_URL} from "@/app/utility/constants";

export async function setThemeCookie(theme: string) {
  cookies().set('theme', theme);
}

export async function clearThemeCookie() {
  cookies().delete('theme');
}

export async function setSidebarCollapseCookie(isCollapsed: boolean) {
  cookies().set('sidebarCollapse', isCollapsed ? '1' : '');
}

export async function clearAccessToken() {
  const token = cookies().get("access_token");
  if (token?.value) {
    const response = await fetch(`${API_URL}logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
        Cookie: `access_token=${token?.value}`
      },
      credentials: 'include',
    });
  }
  cookies().delete('access_token');
}
