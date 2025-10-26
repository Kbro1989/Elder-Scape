const lookupBtn = document.getElementById('lookupBtn');
const playerInput = document.getElementById('playerInput');

lookupBtn.addEventListener('click', async () => {
  const username = playerInput.value.trim();
  if (!username) return;

  const res = await fetch(`/player/${username}`);
  const data = await res.json();

  alert(JSON.stringify(data, null, 2)); // Temporary display, can replace with UI
});
