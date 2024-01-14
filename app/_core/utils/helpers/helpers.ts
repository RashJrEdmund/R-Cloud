/* TODO +=> =======================================
| Implement implement simple app utility functions |
================================================ */

export const shortenText = (text: string, max_length: number) => {
  const isLong = text.length >= max_length + 1;

  return isLong ? text.substring(0, max_length).trim() + '...' : text;
};
