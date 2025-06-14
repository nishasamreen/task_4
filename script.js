const noteInput = document.getElementById('noteInput');
const addBtn = document.getElementById('addBtn');
const notesContainer = document.getElementById('notesContainer');

let notes = JSON.parse(localStorage.getItem('notes')) || [];
renderNotes();

addBtn.addEventListener('click', () => {
  const text = noteInput.value.trim();
  if (text !== "") {
    notes.push(text);
    localStorage.setItem('notes', JSON.stringify(notes));
    noteInput.value = "";
    renderNotes();
  }
});

function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';

    const noteText = document.createElement('div');
    noteText.innerText = note;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.innerText = 'X';
    deleteBtn.onclick = () => {
      notes.splice(index, 1);
 localStorage.setItem('notes', JSON.stringify(notes));
      renderNotes();
    };

    const editBtn = document.createElement('button');
    editBtn.className = 'editBtn';
    editBtn.innerText = 'Edit';
    editBtn.onclick = () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = notes[index];

      const saveBtn = document.createElement('button');
      saveBtn.className = 'saveBtn';
      saveBtn.innerText = 'Save';
      saveBtn.onclick = () => {
        const updatedText = input.value.trim();
        if (updatedText !== '') {
          notes[index] = updatedText;
          localStorage.setItem('notes', JSON.stringify(notes));
          renderNotes();
        }
      };

      noteDiv.innerHTML = '';
      noteDiv.appendChild(input);
      noteDiv.appendChild(saveBtn);
    };

    noteDiv.appendChild(noteText);
noteDiv.appendChild(editBtn);
    noteDiv.appendChild(deleteBtn);

    notesContainer.appendChild(noteDiv);
  });
}