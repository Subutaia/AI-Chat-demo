// Get chatbot elements
const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
const chatbotPanel = document.getElementById('chatbotPanel');

if (chatbotToggleBtn && chatbotPanel) {
  // Toggle chat open/closed when clicking the button
  chatbotToggleBtn.addEventListener('click', () => {
    chatbotPanel.classList.toggle('open');
  });

  // Close chat when clicking anywhere except the chat panel or button
  document.addEventListener('click', (e) => {
    // If chat is open AND user clicked outside chat area, close it
    if (chatbotPanel.classList.contains('open') && 
        !chatbotPanel.contains(e.target) && 
        !chatbotToggleBtn.contains(e.target)) {
      chatbotPanel.classList.remove('open');
    }
  });
}

// Get chatbot DOM elements
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSendBtn = document.getElementById('chatbotSendBtn');

// Create a messages array to keep track of the conversation history
// The first message is a "system" message that tells the assistant how to behave
const messages = [
  {
    role: 'system',
    content: `You are WayChat, Waymark’s friendly creative assistant.

Waymark is a video ad creation platform that helps people turn ideas, products, or messages into high-quality, ready-to-run videos. The platform is used by small businesses, agencies, and marketers to create broadcast-ads with minimal friction.

Your job is to help users shape raw input — whether it’s a business name, a tagline, a product, a vibe, or a rough idea — into a short-form video concept.

Your responses may include suggested video structures, voiceover lines, tone and visual direction, music suggestions, and clarifying follow-up questions.

If the user's input is unclear, ask 1–2 short questions to help sharpen the direction before offering creative suggestions.

Only respond to questions related to Waymark, its tools, its platform, or the creative process of making short-form video ads. If a question is unrelated, politely explain that you're focused on helping users create video ads with Waymark.

Keep your replies concise, collaborative, and focused on helping users express their message clearly. Always align with modern marketing best practices — and stay supportive and friendly.`
  }
];

// Function to add a message to the chat window
function addMessage(text, sender = 'assistant') {
  const messageDiv = document.createElement('div');
  messageDiv.className = sender === 'user' ? 'chat-message user' : 'chat-message assistant';

  // For assistant replies, format the text for better readability
  if (sender === 'assistant') {
    // Replace double line breaks or section headers with <br><br> for spacing
    // Also bold section headers like "Script:", "Tone:", "CTA:"
    let formatted = text
      // Bold common section headers
      .replace(/(Script:|Tone:|CTA:|Music:|Visual Direction:|Voiceover:|Structure:|Questions?:)/g, '<strong>$1</strong>')
      // Add extra spacing before section headers
      .replace(/\n(?=\w+:)/g, '\n\n')
      // Replace double newlines with <br><br>
      .replace(/\n{2,}/g, '<br><br>')
      // Replace single newlines with <br>
      .replace(/\n/g, '<br>');
    messageDiv.innerHTML = formatted;
  } else {
    // For user, just show plain text
    messageDiv.textContent = text;
  }

  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Function to send user input to OpenAI API and display the reply
async function sendMessage() {
  const userInput = chatbotInput.value.trim();
  if (!userInput) return;

  // Add user's message to the chat window and to the messages array
  addMessage(userInput, 'user');
  messages.push({ role: 'user', content: userInput });
  chatbotInput.value = '';

  // Show a "Thinking..." message
  const thinkingDiv = document.createElement('div');
  thinkingDiv.className = 'chat-message assistant';
  thinkingDiv.textContent = 'Thinking...';
  chatbotMessages.appendChild(thinkingDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  try {
    // Send the full conversation history to the API
    // Add temperature and max_tokens for more creative, focused responses
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        temperature: 0.8, // Make the assistant more creative
        max_tokens: 300   // Keep responses short and focused
      })
    });

    const data = await response.json();

    // Get the assistant's reply
    const reply = data.choices && data.choices[0]?.message?.content
      ? data.choices[0].message.content.trim()
      : "Sorry, I couldn't get a response.";

    // Remove the "Thinking..." message
    chatbotMessages.removeChild(thinkingDiv);

    // Add assistant's reply to the chat window and to the messages array
    addMessage(reply, 'assistant');
    messages.push({ role: 'assistant', content: reply });
  } catch (error) {
    chatbotMessages.removeChild(thinkingDiv);
    addMessage('Sorry, there was a problem connecting to the assistant.', 'assistant');
  }
}

// Send message when the send button is clicked
if (chatbotSendBtn && chatbotInput) {
  chatbotSendBtn.addEventListener('click', sendMessage);

  // Optional: Send message when Enter is pressed
  chatbotInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });
}
