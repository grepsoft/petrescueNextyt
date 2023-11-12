import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { hash, compare } from 'bcrypt-ts'

const BASE_URL = "http://localhost:3000/api/"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildUrl(endPoint: string): string {
  const url = new URL(endPoint, BASE_URL)
  return url.href
}

export async function hashPasswrod(nakedPassword: string) {
  const hashPasswrod = await hash(nakedPassword, 10)
  return hashPasswrod
}

export async function comparePassword(nakedPassword: string, hashPassword: string) {
  const result = await compare(nakedPassword, hashPassword)

  return result
}