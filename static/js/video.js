document.addEventListener('DOMContentLoaded', () => {
    const videoInterface = document.getElementById('video-interface');
    const connectionStatus = document.getElementById('connection-status');
    let isConnected = false;
    let localStream = null;

    // Create Family Connection UI elements
    function createFamilyStatusUI() {
        const familyStatusContainer = document.createElement('div');
        familyStatusContainer.id = 'family-status-container';
        familyStatusContainer.style.textAlign = 'center';
        familyStatusContainer.style.marginBottom = '20px';

        const familyStatusText = document.createElement('p');
        familyStatusText.id = 'family-status-text';
        familyStatusText.textContent = "Family currently not in the room. Connect to notify your family you are in the room or ask family to connect.";
        familyStatusText.style.fontSize = '16px';
        familyStatusText.style.color = '#555';

        const askFamilyButton = document.createElement('button');
        askFamilyButton.id = 'ask-family-btn';
        askFamilyButton.textContent = "Ask Family to Connect";
        askFamilyButton.style.marginTop = '10px';
        askFamilyButton.style.padding = '10px 20px';
        askFamilyButton.style.fontSize = '14px';
        askFamilyButton.style.cursor = 'pointer';

        // Handle button click to simulate family connection
        askFamilyButton.addEventListener('click', () => {
            familyStatusText.textContent = "Notifying family...";
            askFamilyButton.disabled = true;
            askFamilyButton.style.cursor = 'not-allowed';

            setTimeout(() => {
                familyStatusText.textContent = "Family is in the Room! Connect now.";
                askFamilyButton.style.display = 'none'; // Hide the button after success
            }, 3000);
        });

        familyStatusContainer.appendChild(familyStatusText);
        familyStatusContainer.appendChild(askFamilyButton);

        return familyStatusContainer;
    }

    async function startVideo() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            localStream = stream;

            const localVideo = document.createElement('video');
            localVideo.id = 'local-video';
            localVideo.autoplay = true;
            localVideo.muted = true;
            localVideo.style.width = '100%';
            localVideo.style.height = '100%';
            localVideo.style.objectFit = 'cover';

            videoInterface.innerHTML = '';
            videoInterface.appendChild(localVideo);

            const controls = document.createElement('div');
            controls.className = 'video-controls';

            const muteBtn = document.createElement('button');
            muteBtn.className = 'control-btn';
            muteBtn.innerHTML = '🎤';
            muteBtn.onclick = () => {
                const audioTracks = localStream.getAudioTracks();
                const isEnabled = audioTracks[0].enabled;
                audioTracks[0].enabled = !isEnabled;
                muteBtn.innerHTML = isEnabled ? '🔇' : '🎤';
            };

            const videoBtn = document.createElement('button');
            videoBtn.className = 'control-btn';
            videoBtn.innerHTML = '📹';
            videoBtn.onclick = () => {
                const videoTracks = localStream.getVideoTracks();
                const isEnabled = videoTracks[0].enabled;
                videoTracks[0].enabled = !isEnabled;
                videoBtn.innerHTML = isEnabled ? '❌' : '📹';
            };

            const hangUpBtn = document.createElement('button');
            hangUpBtn.className = 'control-btn-hang';
            hangUpBtn.innerHTML = '📞';
            hangUpBtn.onclick = () => {
                if (localStream) {
                    localStream.getTracks().forEach(track => track.stop());
                }
                isConnected = false;
                resetInterface();
            };

            controls.appendChild(muteBtn);
            controls.appendChild(videoBtn);
            controls.appendChild(hangUpBtn);
            videoInterface.appendChild(controls);
            localVideo.srcObject = stream;
            return true;
        } catch (err) {
            console.error('Error accessing media devices:', err);
            connectionStatus.textContent = 'Failed to access camera/microphone';
            return false;
        }
    }

    function resetInterface() {
        while (videoInterface.firstChild) {
            videoInterface.removeChild(videoInterface.firstChild);
        }

        // Add the family status UI back
        const familyStatusUI = createFamilyStatusUI();
        videoInterface.appendChild(familyStatusUI);

        const cameraIcon = document.createElement('div');
        cameraIcon.className = 'camera-icon';
        cameraIcon.textContent = '📹';

        const newConnectBtn = document.createElement('button');
        newConnectBtn.id = 'connect-btn';
        newConnectBtn.className = 'connect-btn';
        newConnectBtn.textContent = 'Connect';

        const newStatus = document.createElement('div');
        newStatus.id = 'connection-status';
        newStatus.className = 'connection-status';

        videoInterface.appendChild(cameraIcon);
        videoInterface.appendChild(newConnectBtn);
        videoInterface.appendChild(newStatus);

        // Attach the event listener for the new "Connect" button
        newConnectBtn.addEventListener('click', handleConnect);
    }

    async function handleConnect() {
        const connectBtn = document.getElementById('connect-btn');
        if (!isConnected) {
            connectionStatus.textContent = 'Connecting...';
            connectBtn.disabled = true;

            const success = await startVideo();
            if (success) {
                isConnected = true;
                connectBtn.textContent = 'Disconnect';
                connectBtn.disabled = false;
                connectionStatus.textContent = 'Connected';
            } else {
                connectBtn.disabled = false;
                connectBtn.textContent = 'Retry Connect';
            }
        } else {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            isConnected = false;
            resetInterface();
        }
    }

    // Initial setup: Add family status UI
    const familyStatusUI = createFamilyStatusUI();
    videoInterface.prepend(familyStatusUI);

    // Attach the event listener to the initial "Connect" button
    const connectBtn = document.getElementById('connect-btn');
    connectBtn.addEventListener('click', handleConnect);

    // Handle side panel visibility
    const controlButtons = document.querySelectorAll('.control-button');
    const panels = document.querySelectorAll('.feature-panel');

    controlButtons.forEach(button => {
        button.addEventListener('click', () => {
            const panelId = button.getAttribute('data-panel');
            panels.forEach(panel => {
                if (panel.id === `${panelId}-panel`) {
                    panel.classList.toggle('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            });
        });
    });
});
