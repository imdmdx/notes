
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Utility function to get current logged-in user from localStorage
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showNotes();
    } else {
        alert('Invalid credentials');
    }
}

// Register function
function register() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    const users = getUsers();
    if (users.some(u => u.username === username)) {
        alert('Username already exists');
        return;
    }

    users.push({ username, password, notes: [] });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    showLogin();
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    showLogin();
}

// Show Login form
function showLogin() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('notes-container').style.display = 'none';
}

// Show Register form
function showRegister() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
    document.getElementById('notes-container').style.display = 'none';
}

// Show Notes
function showNotes() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('notes-container').style.display = 'block';

    const currentUser = getCurrentUser();
    if (currentUser) {
        displayNotes(currentUser.notes);
    }
}


function saveNote() {
    const noteInput = document.getElementById('note-input').value;
    const currentUser = getCurrentUser();

    if (currentUser) {
        
        const editingNoteId = document.getElementById('note-input').getAttribute('data-editing');
        if (editingNoteId) {
            
            currentUser.notes[editingNoteId] = noteInput;
            document.getElementById('note-input').removeAttribute('data-editing');
        } else {
            
            currentUser.notes.push(noteInput);
        }

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        displayNotes(currentUser.notes);
        document.getElementById('note-input').value = '';  
    }
}


function displayNotes(notes) {
    const noteListDiv = document.getElementById('note-list');
    noteListDiv.innerHTML = '';

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.textContent = note;
        noteDiv.onclick = function () { editNote(index, note); };
        noteListDiv.appendChild(noteDiv);
    });
}

// Edit note
function editNote(index, note) {
    const noteInput = document.getElementById('note-input');
    noteInput.value = note;
    noteInput.setAttribute('data-editing', index);  // Mark it as editing this note
}

// Initialize app
(function init() {
    if (getCurrentUser()) {
        showNotes();
    } else {
        showLogin();
    }
})();
