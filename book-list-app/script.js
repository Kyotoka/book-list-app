const bookInput = document.getElementById("bookName");
const authorInput = document.getElementById("authorName");
const addBtn = document.getElementById("addBook");
const tableBody = document.getElementById("bookTable");

let books = JSON.parse(localStorage.getItem("books")) || [];


books.forEach(book => addRow(book.book, book.author));


addBtn.addEventListener("click", () => {
  const book = bookInput.value.trim();
  const author = authorInput.value.trim();

  if (book === "" || author === "") {
    alert("Please fill in all fields");
    return;
  }

  const bookData = { book, author };
  books.push(bookData);
  localStorage.setItem("books", JSON.stringify(books));

  addRow(book, author);

  bookInput.value = "";
  authorInput.value = "";
});


function addRow(book, author) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${book}</td>
    <td>${author}</td>
    <td><button class="delete">Delete</button></td>
  `;

  tableBody.appendChild(tr);
}


tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const row = e.target.parentElement.parentElement;
    const bookName = row.children[0].textContent;

    books = books.filter(b => b.book !== bookName);
    localStorage.setItem("books", JSON.stringify(books));

    row.remove();
  }
});
