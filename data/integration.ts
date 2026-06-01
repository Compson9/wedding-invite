export const whatsappRecipient = "233557202013";

export function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappRecipient}?text=${encodeURIComponent(message)}`;
}
