import  { SarvamAIClient } from "sarvamai";

// Load .env variables into process.env
if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile();
  } catch {
    // If .env is missing or invalid, it will be caught by the apiKey check below
  }
}

const apiKey = process.env.SARVAM_API_KEY;

if (!apiKey) {
  console.error("Error: SARVAM_API_KEY is missing or empty in .env");
  process.exit(1);
}

const client = new SarvamAIClient({
  apiSubscriptionKey: apiKey,
});

async function main() {
  const response = await client.chat.completions({
    model: "sarvam-105b-conversations",
    messages: [
      {
        role: "user",
        content: "Hello! In one short sentence, introduce yourself.",
      },
    ],
  });

  console.log(response.choices[0]?.message?.content);
}

main().catch((err) => {
  console.error("API call failed:", err?.message || err);
  process.exit(1);
});
