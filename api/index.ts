import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite"
});

import { SYSTEM_PROMPT } from "./chatContext";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export default async function handler(req: any, res: any) {
    // Only handle POST requests to /api/chat
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message, history = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Convert history to Gemini format
        // Prepend system context as first message
        const chatHistory = [
            {
                role: "user",
                parts: [{ text: SYSTEM_PROMPT }],
            },
            {
                role: "model",
                parts: [{ text: "Hey! How are you doing? I'm Aditi! Feel free to ask me anything about my background, experience, or projects!" }],
            },
            ...history.map((m: ChatMessage) => ({
                role: m.role === "assistant" ? "model" : "user",
                parts: [{ text: m.content }],
            }))
        ];
        const chat = model.startChat({
            history: chatHistory,
        });

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const result = await chat.sendMessageStream(message);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
                res.write(`data: ${JSON.stringify({ content: chunkText })}\n\n`);
            }
        }

        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
    } catch (error) {
        console.error("Chat error:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        console.error("API Key present:", !!process.env.GEMINI_API_KEY);
        console.error("API Key length:", process.env.GEMINI_API_KEY?.length);
        if (res.headersSent) {
            res.write(`data: ${JSON.stringify({ error: "Failed to generate response" })}\n\n`);
            res.end();
        } else {
            res.status(500).json({ error: "Failed to generate response", details: error instanceof Error ? error.message : String(error) });
        }
    }
}
