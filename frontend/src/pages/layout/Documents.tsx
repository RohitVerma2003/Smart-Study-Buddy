import { useEffect } from "react";
import useDocs from "../../hooks/useDocs";
import Loader from "../../components/Loader";
import DocumentCard from "../../components/DocumentCard";
import { FileText, RefreshCcw } from "lucide-react";
import UploadDocumentDialog from "../../components/UploadDocumentDialog";
import { Button } from "../../../components/ui/button";

const Documents = () => {
  const {
    data,
    loading,
    embedding,
    getDocuments,
    uploadDocument,
    startEmbedding,
    reload
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
          <div className="flex gap-3">
            <h1 className="text-3xl font-bold">
              Documents
            </h1>
            <Button variant={"outline"} className="p-2 bg-green-500 cursor-pointer" onClick={reload}>
              <RefreshCcw />
            </Button>
          </div>

          <p className="text-muted-foreground">
            Upload and manage your study
            materials.
          </p>
        </div>
        <UploadDocumentDialog onUpload={uploadDocument} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {data?.data?.map((document: any) => (
          <DocumentCard
            key={document.id}
            document={document}
            startEmbedding={startEmbedding}
            embedding={embedding}
          />
        ))}
      </div>
    </div>
  );
};

export default Documents;