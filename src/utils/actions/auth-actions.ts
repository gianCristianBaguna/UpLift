"use server";

export async function login(username: string, password: string) {
  try {

    const adminUsername = process.env.ADMIN_USERNAME
    const adminPassword = process.env.ADMIN_PASSWORD

    // Validate credentials
    if (username === adminUsername && password === adminPassword) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return {
      error: "Internal server error",
      status: 500
    }
  }
}
