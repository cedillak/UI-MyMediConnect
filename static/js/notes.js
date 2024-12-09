document.addEventListener('DOMContentLoaded', () => {
    const addDoctorNoteBtn = document.getElementById('add-doctor-note-btn');
    const doctorNotesList = document.getElementById('doctor-notes-list');

    function showNoteForm() {
        const form = document.createElement('div');
        form.className = 'note-form';
        form.innerHTML = `
            <textarea id="note-content" class="note-input" placeholder="Enter your note..." required></textarea>
            <div class="form-buttons">
                <button id="save-note" class="add-btn">Save</button>
                <button id="cancel-note" class="cancel-btn">Cancel</button>
            </div>
        `;

        doctorNotesList.insertBefore(form, doctorNotesList.firstChild);

        document.getElementById('save-note').addEventListener('click', saveNote);
        document.getElementById('cancel-note').addEventListener('click', () => form.remove());
    }

    function saveNote() {
        const content = document.getElementById('note-content').value.trim();
        
        if (content) {
            const note = document.createElement('div');
            note.className = 'note';
            note.innerHTML = `
                <div class="note-time">Today ${getCurrentTime()}</div>
                <div class="note-content">${content}</div>
            `;
    
            const form = document.querySelector('.note-form');
            doctorNotesList.insertBefore(note, form);
            form.remove();
    
            // Trigger the notification event
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const event = new CustomEvent('noteAdded', {
                detail: {
                    time: `Today ${currentTime}`,
                    message: `New note added: "${content}"`
                }
            });
            document.dispatchEvent(event);
        }
    }
    

    function getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    addDoctorNoteBtn.addEventListener('click', showNoteForm);
});