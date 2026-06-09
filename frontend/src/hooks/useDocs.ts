import { useState } from "react"
import { api } from "../services/axios";
import toast from "react-hot-toast";

const useDocs = () => {
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [embedding, setEmbedding] = useState(false);


    const getDocuments = async (page: number = 1) => {
        setLoading(true);

        try {
            const res = await api.get(`/files?page=${page}`);
            const result = res.data.result;

            setData(result);
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

    const uploadDocument = async (
        file: File
    ) => {
        try {
            setUploading(true);

            const formData = new FormData();

            formData.append("file", file);

            await api.post(
                "/upload",
                formData
            );

            await getDocuments(1);
        } finally {
            setUploading(false);
        }
    }

    const startEmbedding = async (fileId: string) => {
        setEmbedding(true);

        try {
            const result = await api.post('/start-chat', { fileId });
            const response = result.data.data;

            setData((prev: any) => ({
                ...prev,

                data: prev?.data?.map((doc: any) =>
                    doc.id === fileId
                        ? {
                            ...doc,
                            embeddingStatus: "PROCESSING",
                        }
                        : doc
                ),
            }));

            toast.success(`Embedding ${response.status}`);
            return response;
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Signup failed"
            );

            throw error;
        } finally {
            setEmbedding(false);
        }
    }

    const reload = async () => {
        await getDocuments(data?.pagination?.page || 1);
    }

    return { data, loading, uploading, embedding, getDocuments, uploadDocument, startEmbedding, reload }
}

export default useDocs;