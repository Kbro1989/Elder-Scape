const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatHistory = document.getElementById('chatHistory');

let sessionId = localStorage.getItem('elderscape_session') || crypto.randomUUID();
localStorage.setItem('elderscape_session', sessionId);

async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;
  appendMessage('You', message);
  chatInput.value = '';

  const res = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId })
  });

  const data = await res.json();
  appendMessage('ElderScape AI', data.reply);
}

function appendMessage(sender, text) {
  const div = document.createElement('div');
  div.className = 'chat-message';
  div.innerHTML = `<b>${sender}:</b> ${text}`;
  chatHistory.appendChild(div);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => { if(e.key === 'Enter'){ sendMessage(); } });
