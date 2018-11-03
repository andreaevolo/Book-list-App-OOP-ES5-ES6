// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

UI.prototype.addBook = function(book) {
  const list = document.getElementById("book-list");
  //create element
  const row = document.createElement("tr");
  row.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

UI.prototype.showAlert = function(msg, className) {
  // create alert
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msg));

  // get parent
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  container.insertBefore(div, form);

  // timeout after 3s

  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

// clear inputs

UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};
// Event listeners

document.getElementById("book-form").addEventListener("submit", function(e) {
  // get forms values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  // add boook to list

  // validate
  if (title === "" || author === "" || isbn === "") {
    // error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.addBook(book);

    ui.showAlert("Your book is now added to the list", "success");

    ui.clearFields();
  }

  e.preventDefault();
});

document.querySelector("#book-list").addEventListener("click", function(e) {
  const ui = new UI();

  ui.deleteBook(e.target);
});
