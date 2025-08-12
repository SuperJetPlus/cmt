import * as CryptoJS from "crypto-js";

const CLOUD_NAME = "duurmt9xb";
const API_KEY = "427117118171368";
const API_SECRET = "Ela2T6_IxeVG2fub9IBNdUZa_BM";

export async function uploadImage(file, publicId = null) {
  if (!file) throw new Error("No se proporcionó ningún archivo");

  const timestamp = Math.floor(Date.now() / 1000);
  let paramsToSign = { timestamp };

  if (publicId) {
    paramsToSign.public_id = publicId;
    paramsToSign.overwrite = true;
  }

  const signature = generateSignature(paramsToSign, API_SECRET);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", API_KEY);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  if (publicId) {
    formData.append("public_id", publicId);
    formData.append("overwrite", "true");
  }

  const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const res = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log("Respuesta de Cloudinary:", data);

  if (!res.ok || !data.secure_url) {
    throw new Error(data.error?.message || "Error al subir la imagen a Cloudinary");
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
}

function generateSignature(params, apiSecret) {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return CryptoJS.SHA1(sortedParams + apiSecret).toString(CryptoJS.enc.Hex);
}
