export const whatsappRecipient = "233546411192";

export function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappRecipient}?text=${encodeURIComponent(message)}`;
}
