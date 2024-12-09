document.addEventListener('DOMContentLoaded', () => {
    console.log('appointments.js loaded'); // for debugging
    const addAppointmentBtn = document.getElementById('add-appointment-btn');
    const appointmentsList = document.querySelector('.appointments-list');

    function showAppointmentForm() {
        const form = document.createElement('div');
        form.className = 'appointment-form';
        form.innerHTML = `
            <input type="date" id="appointment-date" required>
            <input type="time" id="appointment-time" required>
            <input type="text" id="appointment-title" placeholder="Appointment Title" required>
            <input type="text" id="appointment-doctor" placeholder="Doctor Name" required>
            <div class="form-buttons">
                <button id="save-appointment" class="add-btn">Save</button>
                <button id="cancel-appointment" class="cancel-btn">Cancel</button>
            </div>
        `;

        appointmentsList.insertBefore(form, appointmentsList.firstChild);

        document.getElementById('save-appointment').addEventListener('click', saveAppointment);
        document.getElementById('cancel-appointment').addEventListener('click', () => form.remove());
    }

    function saveAppointment() {
        const date = document.getElementById('appointment-date').value;
        const time = document.getElementById('appointment-time').value;
        const title = document.getElementById('appointment-title').value;
        const doctor = document.getElementById('appointment-doctor').value;

        if (date && time && title && doctor) {
            const appointment = document.createElement('div');
            appointment.className = 'appointment';
            appointment.innerHTML = `
                <div class="appointment-time">${time} - ${formatDate(date)}</div>
                <div class="appointment-title">${title}</div>
                <div class="appointment-doctor">Dr. ${doctor}</div>
            `;

            const form = document.querySelector('.appointment-form');
            appointmentsList.insertBefore(appointment, form);
            form.remove();
        }
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString();
        }
    }

    addAppointmentBtn.addEventListener('click', showAppointmentForm);
});