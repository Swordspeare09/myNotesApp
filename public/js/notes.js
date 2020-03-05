var $noteText = $("#new_note");
var $saveNoteBtn = $("#note_save");
var $noteList = $(".table");
var $noteDelete = $(".delete-note");
var $option = $("#note_option");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

// A function for saving a note to the db
var saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// A function for deleting a note from the db
var deleteNote = function(id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};


// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
  // $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteText.attr("readonly", true);
    $noteText.val(activeNote.text);
  } else {
    $noteText.attr("readonly", false);
    $noteText.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
var handleNoteSave = function() {
  var optionText = "";

  switch ($option.val()) {
  case "1":
    optionText = "General";
    break;
  case "2":
    optionText = "Shopping List";
    break;
  case "3":
    optionText = "Books to Read";
    break;
  case "4":
    optionText = "Networking Contacts";
    break;
  case "5":
    optionText = "Ideas to Cultivate";
    break;
  default:
    break;
  }

  event.preventDefault();
  var newNote = {
    text: $noteText.val(),
    category: optionText
  };

  saveNote(newNote).then(function() {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
var handleNoteDelete = function(event) {
  event.stopPropagation();

  // prevents the click listener for the list from being called when the button inside of it is clicked
  var note = $(this)
    .parent()
    .parent()
    .data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function() {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
var handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};

// Render's the list of note titles
var renderNoteList = function(notes) {
  $("tbody").empty();

  //var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    //var $li = $("<li class='list-group-item'>").data(note);

    var $newTbaleRow = $(`<tr ><td id="listItem">${note.body}</td>
      <td id="categoryItem"><strong>${note.category}</strong></td>
      <td id="dateItem">${note.createdAt}</td>
      <td id="deleteItem"><button class="button is-light is-danger delete-note">Delete</button>
      </td></tr>`).data(note);
    $("tbody").append($newTbaleRow);

  }

};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};


$saveNoteBtn.on("click", handleNoteSave);
$saveNoteBtn.on("submit", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteDelete.on("click", handleNoteDelete);

// Gets and renders the initial list of notes
getAndRenderNotes();
