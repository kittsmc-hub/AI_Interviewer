import { fetchInterviewQuestions }
from "./api/gemini.js";

import { parseQuestions }
from "../utils/parseQuestions.js";

import { renderQuestions }
from "../ui/renderQuestions.js";

import {
  showLoading,
  hideLoading
} from "../ui/loading.js";

import {
  showError,
  clearError
} from "../ui/errors.js";



// DOM ELEMENTS

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



// FORM SUBMISSION

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const jobTitle = input.value.trim();

  // Validate input
  if (!jobTitle) {

    showError(
      error,
      "Please enter a job title."
    );

    return;
  }

  try {

    // Clear previous states
    clearError(error);

    showLoading(loading);

    // Fetch from Gemini
    const data =
      await fetchInterviewQuestions(jobTitle);

    // Extract Gemini text response
    const text =
      data.text;

    if (!text) {
      throw new Error("No response returned.");
    }

    // Parse questions
    const questions =
      parseQuestions(text);

    // Render cards
    renderQuestions(results, questions);

  } catch (err) {

    console.error(err);

    showError(
      error,
      "Something went wrong while generating questions."
    );

  } finally {

    hideLoading(loading);
  }
});