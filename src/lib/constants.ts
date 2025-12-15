// 900 KB * 1024 MB = 921600 bytes;
export const IMAGE_UPLOADER_MAX_SIZE_VARIABLE = Number(
  process.env.IMAGE_UPLOADER_MAX_SIZE || 921600
);

export const IMAGE_UPLOAD_DIRECTORY_VARIABLE =
  process.env.IMAGE_UPLOAD_DIRECTORY?.toString() ?? "";

export const IMAGE_SERVER_DOMAIN_VARIABLE =
  process.env.IMAGE_SERVER_DOMAIN?.toString() || "";
