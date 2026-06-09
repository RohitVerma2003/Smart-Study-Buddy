import { useState } from "react";
import { api } from "../services/axios";
import toast from "react-hot-toast";

interface Chat {
    message: string;
    user: boolean;
};

const useChat = () => {
    const [chat, setChat] = useState<Chat[]>([]);
    // const [chat, setChat] = useState<Chat[]>([{ user: true, message: "Start the Chat please." }, { user: false, message: "Based on the information provided, here's an explanation of Imagica:\n\n### Short Definition\nImagica is a project that created a **scalable, asynchronous image processing system**.\n\n### Detailed Explanation\nImagica, specifically referred to as \"Imagica - Scalable Image Processor 2,\" is a system designed to handle image uploads and various transformations on those images. The key characteristic of Imagica is its **scalability** and **asynchronous** nature.\n\n*   **Scalable** means it's built to handle a growing number of images and processing tasks without slowing down significantly. It can expand its capacity as demand increases.\n*   **Asynchronous** means that when an image is uploaded or a transformation is requested, the system doesn't wait for that specific task to fully complete before accepting new requests. Instead, it can process multiple tasks concurrently in the background, making it very efficient, especially for resource-intensive operations like image processing.\n\nThis system was built using a set of modern web development technologies including:\n*   **React** and **TypeScript** (likely for the frontend or a part of the application logic).\n*   **Node.js** and **Express** (for the backend server, handling requests).\n*   **Redis** and **BullMQ** (suggesting the use of a robust queuing system to manage asynchronous tasks).\n*   **Docker** (indicating it's containerized for easy deployment and consistent operation across different environments).\n\n### Key Points to Remember\n*   **Purpose:** To process images, handling uploads and transformations.\n*   **Core Feature:** Designed to be scalable and process tasks asynchronously.\n*   **Technologies Used:** React, TypeScript, Node.js, Express, Redis, BullMQ, Docker." }]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (query: string , documentId: string) => {
        try {
            setLoading(true);
            setChat((prev) => ([...prev, { user: true, message: query }]));

            const response = await api.get(`/chat-topic-explain/${documentId}?query=${query}`);
            const message = response.data.message;

            setChat((prev) => ([...prev, { user: false, message }]));
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Signup failed"
            );

            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {chat , loading , sendMessage}
}

export default useChat