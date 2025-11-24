import { useRef, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ProfileFormData } from "./profileSchema";

export default function useProfileImage({
  register,
  setValue,
}: {
  register: UseFormRegister<ProfileFormData>;
  setValue: UseFormSetValue<ProfileFormData>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { ref, onChange, ...rest } = register("image");

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);

    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      if (!e.target.files) return;

      setValue("image", e.target.files);
    }
  };

  return {
    fileInputRef,
    previewImage,
    handleCameraClick,
    handleFileChange,
    registerProps: { ...rest, ref },
  };
}
