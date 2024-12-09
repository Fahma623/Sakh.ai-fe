const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const chatDisplay = document.getElementById('chat-display');
const modeToggle = document.getElementById('mode-toggle');
const cursorToggle = document.getElementById('cursor-toggle');
const cursorHighlightCircle = document.querySelector('.cursor-highlight-circle');
const body = document.body;
const summarizeButton = document.querySelector('.summarize-btn');
const ttsButton = document.querySelector('.tts-btn');
const sttButton = document.querySelector('.audio-btn');

let chatHistory = [];
let isCursorHighlightEnabled = false;
let mediaRecorder;
let audioChunks = [];

function appendMessage(content, isUser) {
  console.log('Appending message:', content, 'isUser:', isUser);
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('chat-message', isUser ? 'user' : 'bot');

  const messageElement = document.createElement('p'); // Create a <p> tag for the message
  messageElement.textContent = content;

  messageContainer.appendChild(messageElement); // Append the <p> to the container
  chatDisplay.appendChild(messageContainer);
  chatDisplay.scrollTop = chatDisplay.scrollHeight; // Scroll to the bottom of the chat
}

async function sendMessage(userMessage) {
  appendMessage(userMessage, true);
  chatHistory.push({ role: 'user', message: userMessage });

  try {
    console.log('Sending message:', userMessage);
    const response = await fetch('https://5001-01jeb6yxm51r5jn8khvcj3gr7k.cloudspaces.litng.ai/mentalsupport', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_history: chatHistory, input_data: userMessage })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received response:', data);
    const botMessage = data.output || 'No response from the server.';

    // Store the response in a variable
    const storedResponse = botMessage;

    // Display the stored response
    appendMessage(storedResponse, false);
    chatHistory.push({ role: 'bot', message: storedResponse });
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = 'Error: Failed to get a response. Try again.';
    appendMessage(errorMessage, false);
    chatHistory.push({ role: 'bot', message: errorMessage });
  }
}

sendButton.addEventListener('click', () => {
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;
  sendMessage(userMessage);
  chatInput.value = '';
});

chatInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    sendMessage(userMessage);
    chatInput.value = '';
  }
});

// Dark Mode Toggle
modeToggle.addEventListener('change', function() {
  if (this.checked) {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
});

// Cursor Highlight Toggle
cursorToggle.addEventListener('click', function() {
  isCursorHighlightEnabled = !isCursorHighlightEnabled;
  if (isCursorHighlightEnabled) {
    body.classList.add('cursor-highlight-enabled');
    document.addEventListener('mousemove', updateCursorHighlightPosition);
  } else {
    body.classList.remove('cursor-highlight-enabled');
    document.removeEventListener('mousemove', updateCursorHighlightPosition);
  }
});

function updateCursorHighlightPosition(event) {
  cursorHighlightCircle.style.left = `${event.clientX - 25}px`;
  cursorHighlightCircle.style.top = `${event.clientY - 25}px`;
}

// Summarize Button Event Listener
summarizeButton.addEventListener('click', async function() {
  if (chatHistory.length === 0) {
    appendMessage('No chat history to summarize.', false);
    return;
  }

  const chatText = chatHistory.map(entry => entry.message).join(' ');

  try {
    const response = await fetch('https://5001-01jeb6yxm51r5jn8khvcj3gr7k.cloudspaces.litng.ai/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input_data: chatText })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const summary = data.output || 'No summary available.';

    appendMessage(`Summary: ${summary}`, false);
  } catch (error) {
    console.error('Error:', error);
    appendMessage('Error: Failed to summarize the chat. Try again.', false);
  }
});

// TTS Button Event Listener
ttsButton.addEventListener('click', async function() {
  if (chatHistory.length === 0) {
    appendMessage('No chat history to convert to speech.', false);
    return;
  }

  const chatText = chatHistory.map(entry => entry.message).join(' ');

  try {
    // Summarize the chat history
    const summarizeResponse = await fetch('https://5001-01jeb6yxm51r5jn8khvcj3gr7k.cloudspaces.litng.ai/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input_data: chatText })
    });

    if (!summarizeResponse.ok) {
      throw new Error(`Error: ${summarizeResponse.status}`);
    }

    const summarizeData = await summarizeResponse.json();
    const summary = summarizeData.output || 'No summary available.';

    // Use the summary for TTS
    console.log('Sending TTS request with input:', summary);
    const ttsResponse = await fetch('https://5001-01jeb6yxm51r5jn8khvcj3gr7k.cloudspaces.litng.ai/text_to_speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input_data: summary })
    });

    if (!ttsResponse.ok) {
      throw new Error(`Error: ${ttsResponse.status}`);
    }

    console.log('TTS response received');
    const blob = await ttsResponse.blob();
    const url = window.URL.createObjectURL(blob);
    console.log('Blob URL created:', url);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'output.wav';
    document.body.appendChild(a);
    console.log('Download link created and appended to body');

    a.click();
    console.log('Download initiated');

    window.URL.revokeObjectURL(url);
    console.log('Blob URL revoked');
  } catch (error) {
    console.error('Error:', error);
    appendMessage('Error: Failed to convert text to speech. Try again.', false);
  }
});

// STT Button Event Listener
sttButton.addEventListener('click', async function() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.addEventListener('dataavailable', event => {
      audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener('stop', async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('file', audioBlob, 'output.wav');

      console.log('Sending STT request with audio blob');
      const response = await fetch('https://5001-01jeb6yxm51r5jn8khvcj3gr7k.cloudspaces.litng.ai/speech_to_text', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.output || 'No text recognized.';

      appendMessage(text, true);
      chatHistory.push({ role: 'user', message: text });

      // Send the recognized text to the chatbot endpoint to get a response
      sendMessage(text);
    });

    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), 10000); // Record for 10 seconds
  } catch (error) {
    console.error('Error:', error);
    appendMessage('Error: Failed to record audio. Try again.', false);
  }
});