export async function fetchInterviewQuestions(jobTitle) {

  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jobTitle }),
  });

  if (!response.ok) {
    throw new Error("Server error");
  }

  return response.json();
}