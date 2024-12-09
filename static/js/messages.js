document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-message');
    const messagesContainer = document.querySelector('.messages-container');

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function createMessage(content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message sent';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = getCurrentTime();

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);

        return messageDiv;
    }

    function sendMessage() {
        const content = messageInput.value.trim();
        if (content) {
            const message = createMessage(content);
            messagesContainer.appendChild(message);
            messageInput.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            sendButton.disabled = true;
        }
    }

    messageInput.addEventListener('input', () => {
        sendButton.disabled = !messageInput.value.trim();
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !sendButton.disabled) {
            e.preventDefault();
            sendMessage();
        }
    });

    sendButton.addEventListener('click', sendMessage);

    // Initialize send button state
    sendButton.disabled = true;
});