export const parseChat = (text) => {
  const lines = text.split("\n");

  let messages = [];

  lines.forEach((line) => {
    const parts = line.split(" - ");
    if (parts.length < 2) return;

    const [date, rest] = parts;
    const [user, message] = rest.split(": ");

    if (!user || !message) return;

    messages.push({ date, user, message });
  });

  return messages;
};