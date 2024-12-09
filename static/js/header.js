document.addEventListener('DOMContentLoaded', () => {
    // Simulate doctor presence status
    const doctorStatus = document.querySelector('.doctor-status .indicator-dot');
    const healthStatus = document.querySelector('.health-status .indicator-dot');
    
    // Simulate doctor presence (random for demo)
    setInterval(() => {
        const isPresent = Math.random() > 0.5;
        doctorStatus.className = 'indicator-dot ' + (isPresent ? 'active' : '');
    }, 5000);
    
    // Simulate health status changes (random for demo)
    setInterval(() => {
        const status = Math.random();
        if (status > 0.7) {
            healthStatus.className = 'indicator-dot danger';
        } else if (status > 0.4) {
            healthStatus.className = 'indicator-dot warning';
        } else {
            healthStatus.className = 'indicator-dot active';
        }
    }, 8000);

    const notificationBtn = document.getElementById('notification-btn');
    const header = document.querySelector('.app-header');
    let notifications = [
        { time: 'Yesterday 2:15 PM', message: 'Family Added Note: "Mom noticed improved appetite during lunch."' }
    ];
    let hasNewNotification = false;

    // Create the notification pop-up
    const notificationPopup = document.createElement('div');
    notificationPopup.className = 'notification-popup';
    header.appendChild(notificationPopup);

    // Function to update and show notifications
    function updateNotifications() {
        notificationPopup.innerHTML = notifications.map(n => `
            <div class="notification">
                <div class="notification-time">${n.time}</div>
                <div class="notification-message">${n.message}</div>
            </div>
        `).join('');
    }

    // Toggle the visibility of the notification pop-up
    notificationBtn.addEventListener('click', () => {
        if (notificationPopup.style.display === 'block') {
            notificationPopup.style.display = 'none';
        } else {
            updateNotifications();
            notificationPopup.style.display = 'block';

            // Reset the new notification indicator
            hasNewNotification = false;
            notificationBtn.style.backgroundColor = ''; // Reset to original color
        }
    });

    // Add notification when a new appointment is created
    document.addEventListener('appointmentAdded', (event) => {
        const { time, message } = event.detail;
        notifications.unshift({ time, message });

        // Update the display if the pop-up is already open
        if (notificationPopup.style.display === 'block') {
            updateNotifications();
        } else {
            // Indicate a new notification
            hasNewNotification = true;
            notificationBtn.style.backgroundColor = 'red';
        }
    });

    // Add notification when a new note is added
    document.addEventListener('noteAdded', (event) => {
        const { time, message } = event.detail;
        notifications.unshift({ time, message });

        // Update the display if the pop-up is already open
        if (notificationPopup.style.display === 'block') {
            updateNotifications();
        } else {
            // Indicate a new notification
            hasNewNotification = true;
            notificationBtn.style.backgroundColor = 'red';
        }
    });

    // Close the popup if clicking outside
    document.addEventListener('click', (event) => {
        if (!notificationPopup.contains(event.target) && event.target !== notificationBtn) {
            notificationPopup.style.display = 'none';
        }
    });
});
