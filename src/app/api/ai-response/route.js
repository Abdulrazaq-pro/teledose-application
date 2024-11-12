import axios from "axios";

export async function POST(request) {
  const apiKey = process.env.AI_API_KEY;

  // Ensure the API key is available
  if (!apiKey) {
    console.error("API Key is missing or undefined.");
    return new Response(
      JSON.stringify({ error: "Server misconfiguration: API key missing" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Parse the request body
    const { _input = "" } = await request.json();

    // Check for required input
    if (!_input) {
      return new Response(
        JSON.stringify({ error: "Input data is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Send the request to the external API
    const response = await axios.post(
      "https://webgeeks.pythonanywhere.com/api/v1/ai-response/",
      { _input },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${apiKey}`,
        },
      }
    );

    // Clean and format the output
    const originalData = response.data;
    const cleanedOutput = (originalData.output || "")
      .replace(/\n+/g, "&#10;") // Use HTML entity for newline (for textarea compatibility)
      .replace(/</g, "&lt;") // Escape any HTML tags for security
      .replace(/>/g, "&gt;")
      .trim();

    return new Response(
      JSON.stringify({ ...originalData, output: cleanedOutput }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error forwarding request:", error.message);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch AI response",
        details: error.response?.data || "No additional details",
      }),
      {
        status: error.response?.status || 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
