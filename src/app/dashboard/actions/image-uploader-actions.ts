"use server";

// Libs
import { IMAGE_UPLOADER_MAX_SIZE_VARIABLE } from "../../../lib/constants";
// import { checkLoginSession } from "../../lib/login/manage-login";

export type CloudinaryUploadResponseType = {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
};

type uploadImageActionProps = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData
): Promise<uploadImageActionProps> {
  const cloudinary = await import("cloudinary").then((m) => m.v2);

  // const hasUserLogged = await checkLoginSession();

  const responseReturn = { url: "", error: "" };

  // if (!hasUserLogged) {
  //   return { ...responseReturn, error: "Faça para continuar." };
  // }

  if (!(formData instanceof FormData)) {
    return { ...responseReturn, error: "Dados inválidos." };
  }

  const file = formData.get("file");

  if (!file) {
    return { ...responseReturn, error: "Arquivo não encontrado." };
  }

  if (!(file instanceof File)) {
    return { ...responseReturn, error: "Arquivo inválido." };
  }

  if (file.size > IMAGE_UPLOADER_MAX_SIZE_VARIABLE) {
    return { ...responseReturn, error: "Imagem muito grande." };
  }

  if (!file.type.startsWith("image/")) {
    return { ...responseReturn, error: "Imagem inválida." };
  }

  // Covert file to base64
  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");
  const dataURI = `data:${file.type};base64,${base64}`;

  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
      api_key: process.env.CLOUDINARY_API_KEY!,
      api_secret: process.env.CLOUDINARY_API_SECRET!,
      secure: true,
    });

    const response: CloudinaryUploadResponseType =
      await cloudinary.uploader.upload(dataURI, {
        folder: "ravie-ecommerce",
      });

    return { ...responseReturn, url: response.secure_url, error: "" };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err?.error?.message) {
      return {
        url: "",
        error: `Cloudinary: ${err.error.message} (code: ${
          err.error.http_code ?? "?"
        })`,
      };
    }

    return {
      url: "",
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
