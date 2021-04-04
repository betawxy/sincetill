import { storage } from "lib/firebase";
import { useState } from "react";
import FileUploader from "react-firebase-file-uploader";

type TProps = {
  successCallback: (url: string) => void;
  currentImageUrl: string;
};

export default function ImageUploader({
  successCallback,
  currentImageUrl,
}: TProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(currentImageUrl);

  const handleUploadStart = () => {
    setUploading(true);
    setProgress(0);
  };

  const handleProgress = (progress: number) => setProgress(progress);

  const handleUploadError = (error) => {
    setUploading(false);
    console.error(error);
  };

  const handleUploadSuccess = (filename) => {
    setUploading(false);
    setProgress(100);

    storage
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
        successCallback(url);
      });
  };

  return (
    <div>
      {uploading && <div className="text-gray-500">Progress: {progress}%</div>}
      {imageUrl && (
        <img
          src={imageUrl}
          className="w-60 h-60 bg-white border-2 border-dashed mb-3"
        />
      )}
      <FileUploader
        accept="image/*"
        name="image"
        randomizeFilename
        storageRef={storage.ref("images")}
        onUploadStart={handleUploadStart}
        onUploadError={handleUploadError}
        onUploadSuccess={handleUploadSuccess}
        onProgress={handleProgress}
      />
    </div>
  );
}
