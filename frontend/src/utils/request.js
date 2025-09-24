// src/utils/requests.js
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export async function fetchData(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error("❌ API fetch error:", err);
    throw err;
  }
}
