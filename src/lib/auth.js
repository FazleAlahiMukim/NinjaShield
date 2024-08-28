import axios from "axios";

export async function refreshAccessToken() {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh-token`,
      {},
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error;
  }
}
