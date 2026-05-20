export function showError(element, message) {
  element.textContent = message;
  element.classList.add("show");
}

export function clearError(element) {
  element.textContent = "";
  element.classList.remove("show");
}