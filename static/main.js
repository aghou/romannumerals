const form = document.getElementById('convertForm');
const resultElm = document.getElementById('resultElm');
form.addEventListener('submit', convertAction);

/**
 * Convert number to roman literals
 * @param {SubmitEvent} event
 */
function convertAction(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {
    n: formData.get('n'),
  };
  fetch(`convert?${new URLSearchParams(data)}`)
    .then((response) => response.text())
    .then((value) => {
      resultElm.textContent = value;
    });
}
