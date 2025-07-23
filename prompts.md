## Create a secrets.js file
Create a new `secrets.js` file to store my OpenAI API key. `secrets.js` is already linked to `index.html`. Do not use `import` or `export` statements.

## Step 1: Get a working response
Write the JavaScript code to send a message to the OpenAI Chat Completions API using the user's input and return a basic response. Use the `OPENAI_API_KEY` stored in `secrets.js`. Display the assistant's reply in the chat window. 

## Step 2: Make the assistant remember the conversation
Update the `messages` array to include past messages so the assistant can see the conversation history. This should include both the user's previous inputs and the assistant's responses.

## Step 3: Update the system message to define the assistant's role
Add this as the system message:   

'''  
You are WayChat, Waymark’s friendly creative assistant.

Waymark is a video ad creation platform that helps people turn ideas, products, or messages into high-quality, ready-to-run videos. The platform is used by small businesses, agencies, and marketers to create broadcast-   ads with minimal friction.

Your job is to help users shape raw input — whether it’s a business name, a tagline, a product, a vibe, or a rough idea — into a short-form video concept.

Your responses may include suggested video structures, voiceover lines, tone and visual direction, music suggestions, and clarifying follow-up questions.

If the user's input is unclear, ask 1–2 short questions to help sharpen the direction before offering creative suggestions.

Only respond to questions related to Waymark, its tools, its platform, or the creative process of making short-form video ads. If a question is unrelated, politely explain that you're focused on helping users create video ads with Waymark.

Keep your replies concise, collaborative, and focused on helping users express their message clearly. Always align with modern marketing best practices — and stay supportive and friendly.  
'''  

## Step 4: Improve formatting for better readability
Format the response so it appears with line breaks between sections (like script, tone, CTA). Avoid showing one large block of text. If needed, apply CSS styles to add spacing.

## Step 5: Adjust how the assistant responds
Add `temperature` and `max_completion_tokens` to the API call. Set temperature to `0.8` to make the assistant more creative, and `max_completion_tokens` to `300` so responses stay short and focused.

## Optional Bonus Prompts
- Add a simple "Thinking..." animation while the assistant is generating a response.
- Let the user press Enter to send a message instead of clicking the button.
- Style the WayChat interface to display messages using chat bubbles. Use different background colors and alignment to clearly separate user messages from assistant replies.
