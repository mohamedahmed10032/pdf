function saveNote() {
  const title = document.getElementById("note-title").value.trim();
  const body = document.getElementById("note-body").value.trim();

  if (!title || !body) {
    alert("يرجى كتابة العنوان والمحتوى");
    return;
  }

  localStorage.setItem("note_" + title, body);
  alert("تم حفظ الملاحظة بنجاح!");
  loadNotes();
  document.getElementById("note-title").value = "";
  document.getElementById("note-body").value = "";
}

function loadNotes() {
  const notesList = document.getElementById("saved-notes");
  notesList.innerHTML = "";

  for (let key in localStorage) {
    if (key.startsWith("note_")) {
      const title = key.replace("note_", "");
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${title}</span>
        <button onclick="deleteNote('${title}')">🗑️</button>
      `;
      li.onclick = () => {
        document.getElementById("note-title").value = title;
        document.getElementById("note-body").value = localStorage.getItem(key);
      };
      notesList.appendChild(li);
    }
  }
}

function deleteNote(title) {
  localStorage.removeItem("note_" + title);
  loadNotes();
}

function goBack() {
  window.location.href = "index.html";
}

window.onload = loadNotes;
