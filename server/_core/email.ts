import { ENV } from "./env";

export type EmailPayload = {
  to: string;
  subject: string;
  body: string;
};

/**
 * Send an email via Manus Data API.
 * Returns `true` if successful, `false` if the service is unavailable.
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    console.warn("[Email] Forge API credentials not configured");
    return false;
  }

  try {
    const endpoint = new URL("v1/email/send", ENV.forgeApiUrl).toString();
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "authorization": `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        to: payload.to,
        subject: payload.subject,
        body: payload.body,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Email] Failed to send email to ${payload.to} (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.warn("[Email] Error sending email:", error);
    return false;
  }
}
