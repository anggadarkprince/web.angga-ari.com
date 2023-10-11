'use server'

import { cookies } from 'next/headers'

export async function setThemeCookie(theme: string) {
  cookies().set('theme', theme);
}

export async function clearThemeCookie() {
  cookies().delete('theme');
}
