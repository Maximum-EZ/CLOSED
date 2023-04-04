// Get the button element by its ID
const continueButton = document.getElementById('continue-button');

// Add a click event listener to the button
continueButton.addEventListener('click', () => {
  // Redirect the user to the "about.html" page in the "pages" directory
  window.location.href = 'index.html';
});
