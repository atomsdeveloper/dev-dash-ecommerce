"use client";

// Components
import { Button } from "../../../components/ui/button";

// Constants
import { IMAGE_UPLOADER_MAX_SIZE_VARIABLE } from "../../../lib/constants";

// Icons
import { ImageUpIcon } from "lucide-react";

// Hooks
import { useRef, useState, useTransition } from "react";

// Toast
import { toast } from "react-toastify";

// Component Cloudinary
import { CldImage } from "next-cloudinary";

// Actions
import { uploadImageAction } from "../actions/image-uploader-actions";

// type ImageUploaderProps = {
//   disabled?: boolean;
//   uploadAction: (
//     formData: FormData
//   ) => Promise<{ url: string; error?: string }>;
// };
export const ImageUploader = () =>
  //   {
  //   disabled = false,
  //   uploadAction,
  // }: ImageUploaderProps
  {
    const inputRef = useRef<HTMLInputElement>(null);
    const [hasPending, startTransaction] = useTransition();
    const [hasImage, setHasImage] = useState<string>("");

    // Handle click button to copy click for input.
    const handleClickButton = () => {
      if (inputRef.current === null) return;

      inputRef.current.click();
    };

    // Handle change value input for validate.
    const handleInputChangeValue = () => {
      toast.dismiss();
      toast.info("Enviando a sua imagem, aguarde...");

      if (inputRef.current === null) return;

      const fileValueInputCurrent = inputRef.current; // Get value current
      const file = fileValueInputCurrent?.files?.[0]; // Get of value current only file.

      if (!file) {
        toast.dismiss();
        toast.warning("Imagem não existe, Tente novamente!.");
        setHasImage("");
        return;
      }

      if (file.size > IMAGE_UPLOADER_MAX_SIZE_VARIABLE) {
        toast.dismiss();
        toast.warning(
          `Imagem é muito grande. O tamanho máximo é ${
            IMAGE_UPLOADER_MAX_SIZE_VARIABLE / 1024 + "KB"
          }, Tente novamente!.`
        );

        setHasImage("");

        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      startTransaction(async () => {
        toast.dismiss();

        const response = await uploadImageAction(formData);

        if (response.error && response.url === "") {
          toast.error(response.error);
          setHasImage("");
          return;
        }

        toast.success(`Imagem enviada com sucesso.`);

        setHasImage(response.url);
      });
    };

    return (
      <div className="flex flex-col gap-2 text-sm ">
        <p className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
          Imagem do Produto
        </p>
        <Button
          onClick={handleClickButton}
          size="sm"
          type="button"
          variant="default"
          className="flex items-center disabled:cursor-none disabled:opacity-45"
          disabled={hasPending || hasPending}
        >
          <ImageUpIcon />
          Selecionar imagem
        </Button>

        <input
          ref={inputRef}
          name="file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChangeValue}
          disabled={hasPending || hasPending}
        />

        {hasImage && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <b className="text-xs">URL:</b>
              <p
                className="text-sm text-muted-foreground"
                aria-description="Url da imagem enviada para o servidor"
              >
                {hasImage}
              </p>
            </div>

            <CldImage
              src={hasImage}
              aria-description="Preview da imagem enviada para o servidor."
              alt="Imagem."
              width={100}
              height={100}
            />
          </div>
        )}
      </div>
    );
  };
