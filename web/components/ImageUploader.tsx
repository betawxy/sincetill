import { storage } from "lib/firebase";
import { useState } from "react";
import FileUploader from "react-firebase-file-uploader";

export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const handleUploadStart = () => {
    setUploading(true);
    setProgress(0);
  };

  const handleProgress = (progress) => setProgress(progress);

  const handleUploadError = (error) => {
    setUploading(false);
    console.log(error);
  };

  const handleUploadSuccess = (filename) => {
    setUploading(false);
    setProgress(100);

    storage
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => setImageUrl(url));
  };

  return (
    <div>
      {uploading && <p>Progress: {progress}</p>}
      {imageUrl && <img src={imageUrl} />}
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
