import { fetchServer } from "@/lib/api-server";
import ChatbotClient from "@/components/marketing/services/ChatbotClient";

export default async function ChatbotDevelopmentPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/web-software/chatbot", {
      revalidate: 60,
    });
    content = res.data;
  } catch (err) {
    console.error("Failed to load chatbot content on server", err);
  }

  // We pass content even if null because ChatbotClient has internal fallbacks (as seen in the original code)
  return <ChatbotClient content={content} />;
}
