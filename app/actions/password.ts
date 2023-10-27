import db from "@/app/libs/db";
import crypto from "crypto";
import {API_URL} from "@/app/utility/constants";

const decrypt = (text: { iv: string; encryptedData: string }) => {
  const iv = Buffer.from(text.iv, 'hex');
  const encryptedText = Buffer.from(text.encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    'angga-secret',
    '83034e029c4227086c81b7cb9f5d4228',
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export async function decodeResetToken(token: string) {
  const response = await fetch(`${API_URL}auth/verify-reset-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token}),
  });
  const result = await response.json();
  if (response.ok) {
    return db.user.findUnique({
      where: {
        email: result?.data?.email || '',
      },
    });
  }
  throw Error(result?.message || 'Something went wrong');
}
