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
    sid,
  };
  fetch(`convert?${new URLSearchParams(data)}`);
}

let sid = '';
const sseSource = new EventSource('subscribe');
sseSource.addEventListener('init', (event) => {
  sid = event.data;
});

sseSource.onmessage = (event) => {
  resultElm.textContent = event.data;
};
