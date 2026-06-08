import { useState } from "react"
import { api } from "../services/axios";
import toast from "react-hot-toast";

const useDocs = () => {
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);


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

    return { data, loading, getDocuments, uploadDocument }
}

export default useDocs;