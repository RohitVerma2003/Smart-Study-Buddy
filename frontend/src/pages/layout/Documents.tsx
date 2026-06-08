import { useEffect } from "react";
import useDocs from "../../hooks/useDocs";
import Loader from "../../components/Loader";
import DocumentCard from "../../components/DocumentCard";
import { FileText } from "lucide-react";
import UploadDocumentDialog from "../../components/UploadDocumentDialog";

const Documents = () => {
  const {
    data,
    loading,
    getDocuments,
    uploadDocument
  } = useDocs();

  useEffect(() => {
    getDocuments(1);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!data?.data?.length) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <FileText className="h-12 w-12 text-muted-foreground" />

        <h2 className="mt-4 text-xl font-semibold">
          No Documents Yet
        </h2>

        <p className="text-muted-foreground">
          Upload your first PDF to start
          chatting with AI.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Documents
          </h1>

          <p className="text-muted-foreground">
            Upload and manage your study
            materials.
          </p>
        </div>
        <UploadDocumentDialog onUpload={uploadDocument} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.data?.map((document: any) => (
          <DocumentCard
            key={document.id}
            document={document}
          />
        ))}
      </div>
    </div>
  );
};

export default Documents;