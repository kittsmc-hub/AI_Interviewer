import { fetchInterviewQuestions }
from "./api/gemini.js";

import { parseQuestions }
from "./utils/parseQuestions.js";

import { renderQuestions }
from "./ui/renderQuestions.js";

import {
  showLoading,
  hideLoading
} from "./ui/loading.js";

import {
  showError,
  clearError
} from "./ui/errors.js";

const form =
  document.getElementById("questionForm");

const input =
  document.getElementById("jobTitle");

const results =
  document.getElementById("results");

const loading =
  document.getElementById("loadingState");

const error =
  document.getElementById("errorMessage");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const jobTitle = input.value.trim();

  if (!jobTitle) {
    showError(error, "Enter a job title");
    return;
  }

  try {

    clearError(error);
    showLoading(loading);

    const data =
      await fetchInterviewQuestions(jobTitle);

    const text =
      data.text;

    const questions =
      parseQuestions(text);

    renderQuestions(results, questions);

  } catch (err) {

    showError(error, "Failed to generate questions");

  } finally {

    hideLoading(loading);
  }
});