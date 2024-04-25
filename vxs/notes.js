// Load notes from local storage
function loadNotes() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        createNoteItem(note);
    });
}

// Save notes to local storage
function saveNotes() {
    let notes = [];
    document.querySelectorAll('#noteList li').forEach(li => {
        notes.push(li.querySelector('.noteText').textContent);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to create a new note item
function createNoteItem(note) {
    let noteList = document.getElementById("noteList");
    let li = document.createElement("li");
    let noteText = document.createElement("div");
    noteText.textContent = note;
    noteText.className = 'noteText';
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Trash";
    deleteBtn.className = "deleteBtn";
    li.appendChild(noteText);
    li.appendChild(deleteBtn);
    noteList.appendChild(li);
}

// Function to add a note to the list
function addNote() {
    let noteInput = document.getElementById("noteInput");
    let note = noteInput.value.trim();
    if (note !== "") {
        createNoteItem(note);
        saveNotes();
        noteInput.value = "";
    }
}

// Function to delete a note
function deleteNote() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
    saveNotes();
}

// Event listener for save note button
document.getElementById("saveNoteBtn").addEventListener("click", addNote);

// Event delegation for dynamically created delete buttons
document.addEventListener('click', function(e) {
    if (e.target && e.target.className == 'deleteBtn') {
        deleteNote.call(e.target);
    }
});

// Load notes when the page loads
loadNotes();
