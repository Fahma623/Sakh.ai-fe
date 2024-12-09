const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const chatDisplay = document.getElementById('chat-display');

let chatHistory = [];

function appendMessage(content, isUser) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('chat-message', isUser ? 'user' : 'bot');

  const messageElement = document.createElement('p'); // Create a <p> tag for the message
  messageElement.textContent = content;

  messageContainer.appendChild(messageElement); // Append the <p> to the container
  chatDisplay.appendChild(messageContainer);
  chatDisplay.scrollTop = chatDisplay.scrollHeight; // Scroll to the bottom of the chat
}

async function sendMessage() {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  appendMessage(userMessage, true);
  chatHistory.push({ role: 'user', message: userMessage });
  chatInput.value = '';

  try {
    const response = await fetch('https://5001-01jeb6yxm51r5jn8khvcj3gr7k.cloudspaces.litng.ai/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input_data: userMessage })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const botMessage = data.output_data || 'No response from the server.';
    appendMessage(botMessage, false);
    chatHistory.push({ role: 'bot', message: botMessage });
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = 'Error: Failed to get a response. Try again.';
    appendMessage(errorMessage, false);
    chatHistory.push({ role: 'bot', message: errorMessage });
  }
}

sendButton.addEventListener('click', sendMessage);

chatInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});