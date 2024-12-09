document.addEventListener('DOMContentLoaded', () => {
    const connectBtn = document.getElementById('connect-btn');
    const connectionStatus = document.getElementById('connection-status');
    const videoInterface = document.getElementById('video-interface');
    let isConnected = false;
    let localStream = null;

    async function startVideo() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: true, 
                audio: true 
            });
            localStream = stream;
            
            // Create video element for local stream
            const localVideo = document.createElement('video');
            localVideo.id = 'local-video';
            localVideo.autoplay = true;
            localVideo.muted = true; // Mute local video to prevent feedback
            localVideo.style.width = '100%';
            localVideo.style.height = '100%';
            localVideo.style.objectFit = 'cover';
            
            // Replace the camera icon with the video
            videoInterface.innerHTML = '';
            videoInterface.appendChild(localVideo);
            
            // Add controls
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
            
            controls.appendChild(muteBtn);
            controls.appendChild(videoBtn);
            videoInterface.appendChild(controls);
            
            // Set the video source
            localVideo.srcObject = stream;
            
            return true;
        } catch (err) {
            console.error('Error accessing media devices:', err);
            connectionStatus.textContent = 'Failed to access camera/microphone';
            return false;
        }
    }

    connectBtn.addEventListener('click', async () => {
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
            // Stop all tracks
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            
            // Reset the interface
            isConnected = false;
            connectBtn.textContent = 'Connect';
            connectionStatus.textContent = '';
            
            // Remove video element and controls
            while (videoInterface.firstChild) {
                videoInterface.removeChild(videoInterface.firstChild);
            }
            
            // Add back the initial elements
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
            
            // Update the button reference and its event listener
            const oldBtn = connectBtn;
            oldBtn.replaceWith(newConnectBtn);
            newConnectBtn.addEventListener('click', arguments.callee);
        }
    });

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