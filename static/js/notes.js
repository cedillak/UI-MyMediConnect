document.addEventListener('DOMContentLoaded', () => {
    const doctorNoteInput = document.getElementById('doctor-note-input');
    const addDoctorNoteBtn = document.getElementById('add-doctor-note');
    const doctorNotesList = document.getElementById('doctor-notes-list');

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function createNote(content) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';

        const timeDiv = document.createElement('div');
        timeDiv.className = 'note-time';
        timeDiv.textContent = `Today ${getCurrentTime()}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'note-content';
        contentDiv.textContent = content;

        noteDiv.appendChild(timeDiv);
        noteDiv.appendChild(contentDiv);

        return noteDiv;
    }

    function addNote() {
        const content = doctorNoteInput.value.trim();
        if (content) {
            const note = createNote(content);
            doctorNotesList.insertBefore(note, doctorNotesList.firstChild);
            doctorNoteInput.value = '';
            addDoctorNoteBtn.disabled = true;
        }
    }

    doctorNoteInput.addEventListener('input', () => {
        addDoctorNoteBtn.disabled = !doctorNoteInput.value.trim();
    });

    doctorNoteInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !addDoctorNoteBtn.disabled) {
            e.preventDefault();
            addNote();
        }
    });

    addDoctorNoteBtn.addEventListener('click', addNote);

    // Initialize add note button state
    addDoctorNoteBtn.disabled = true;
});