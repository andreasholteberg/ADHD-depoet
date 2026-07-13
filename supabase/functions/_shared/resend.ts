interface EmailPayload {
  to: string;
  from: string;
  subject: string;
  text: string;
}

export async function sendPlainEmail(payload: EmailPayload, apiKey: string): Promise<string | null> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(typeof data?.message === 'string' ? data.message : 'resend_error');
  }

  return typeof data?.id === 'string' ? data.id : null;
}
