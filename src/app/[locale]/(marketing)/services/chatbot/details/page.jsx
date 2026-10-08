import { fetchServer } from "@/lib/api-server";
import ChatbotDetailsClient from "@/components/marketing/services/ChatbotDetailsClient";

export default async function ChatbotDetailsPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/ai-managed/chatbot", {
      revalidate: 60,
    });
    if (res.data) {
      content = res.data;
    }
  } catch (err) {
    console.error("Failed to load chatbot details on server", err);
  }

  return <ChatbotDetailsClient data={content?.details} />;
}
