export function parseQuestions(text) {
  const matches = text.match(/\d+\.\s.+/g);

  if (!matches) return [];

  return matches.map(q =>
    q.replace(/^\d+\.\s*/, "")
  );
}