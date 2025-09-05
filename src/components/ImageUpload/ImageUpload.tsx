import { useRef } from "react";
import Button from "../Button/Button";
import classes from "./ImageUpload.module.css";

type ImageUploadProps = {
  onChange: (file?: File) => void;
  label?: string;
  fileOrPath?: File | string;
};
export default function ImageUpload({
  onChange,
  fileOrPath,
  label = "Upload Image",
}: ImageUploadProps) {
  const fileInputRef: React.RefObject<null | HTMLInputElement> = useRef(null);

  let previewFileUrl: string | undefined;
  let file: File | undefined;

  if (typeof fileOrPath === "string") {
    previewFileUrl = fileOrPath;
  } else if (fileOrPath instanceof File) {
    file = fileOrPath;
    previewFileUrl = URL.createObjectURL(file);
  }

  const onDeleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onChange(undefined);

    if (fileInputRef.current?.value) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        {previewFileUrl && (
          <>
            <button onClick={onDeleteHandler} type="button">
              X
            </button>
            <img src={previewFileUrl} alt="Event image" />
          </>
        )}
      </div>
      <div className={classes.btnContainer}>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            fileInputRef.current?.click();
          }}
        >
          {label}
        </Button>
        <span>{file?.name ?? "No file selected"}</span>
        <input
          ref={fileInputRef}
          onChange={(e) => {
            onChange(e.target.files?.[0]);
          }}
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.jpeg,.png,.svg"
        />
      </div>
    </div>
  );
}
