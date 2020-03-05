var $noteText = $("#new_note");
var $saveNoteBtn = $("#note_save");
var $noteList = $("#noteList");
var $noteDelete = $(".delete-note");
var $option = $("#note_option");
var $userName = $("#name_header");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = function () {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

// A function for saving a note to the db
var saveNote = function (note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// A function for deleting a note from the db
var deleteNote = function (id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

var getUser = function () {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveNote = function () {
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
var handleNoteSave = function () {

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

  saveNote(newNote).then(function () {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
var handleNoteDelete = function (event) {
  event.stopPropagation();
  // prevents the click listener for the list from being called when the button inside of it is clicked
  var note = $(this)
    .parent(".list-group-item")
    .data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function () {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
var handleNoteView = function () {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
// var handleNewNoteView = function () {
//   activeNote = {};
//   renderActiveNote();
// };
//jeuery.txt
//
// Render's the list of note titles
var renderNoteList = function (notes) {
  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var $li = $("<li class='list-group-item'>").data(note);
    var $span = $("<span class='item-text'>").text(note.body);
    var $cat = $("<span class ='item-category'>").text(note.category);
    var $editBtn = $(
      "<button class='button is-light is-primary'>Edit</button>"
    );
    var $delBtn = $(
      "<button class='button is-danger is-light float-right delete-note'> Delete </button>"
    );

    $li.append($span,$cat, $editBtn, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function () {
  return getNotes().then(function (data) {
    renderNoteList(data);
  });
};

var renderUserName = function (userName) {


};


$saveNoteBtn.on("click", handleNoteSave);
$saveNoteBtn.on("submit", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteDelete.on("click", handleNoteDelete);





// Gets and renders the initial list of notes
getAndRenderNotes();

