import { fetchServer } from "@/lib/api-server";
import ChatbotClient from "@/components/marketing/services/ChatbotClient";

export async function generateMetadata() {
  return {
    title: "AI Chatbot & Autonomous Support Agents — Smart Youth ICT",
    description:
      "Enterprise RAG-powered conversational AI agents with sub-250ms streaming latency, multi-channel WhatsApp and web synchronization, and deterministic workflow governance.",
    keywords: [
      "AI Chatbot",
      "Conversational AI",
      "RAG Agent",
      "WhatsApp Business Bot",
      "Autonomous Support",
      "LLM Integration",
      "Smart Youth ICT",
    ],
    openGraph: {
      title: "AI Chatbot & Autonomous Support Agents — Smart Youth ICT",
      description:
        "Architecting 24/7 autonomous support with precision. Connect custom LLM agents to your knowledge base and CRM.",
      type: "website",
    },
  };
}

export default async function ChatbotDevelopmentPage() {
  let content = null;
  try {
    const res = await fetchServer("/cms/services/ai-managed/chatbot", {
      revalidate: 60,
    });
    content = res?.data;
  } catch (err) {
    console.error("Failed to load chatbot content on server", err);
  }

  return <ChatbotClient content={content} />;
}
