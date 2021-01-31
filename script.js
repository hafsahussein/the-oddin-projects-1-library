const books = document.querySelector('#books');
const addBookForm = document.querySelector('form');
let myLibrary = [];

// generate specific random ID
    function generateID() {
      var S4 = function() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }
  // book constructor
    function Book(title, author, pages){
        this.title= title
        this.author = author
        this.pages = pages
        this.read = false 
        this.id = generateID();
    }
    Book.prototype.addToLibrary = function () {
      myLibrary.push(this)
    }   
  //  create book
    function createBook (book){
      const bookCard = document.createElement('div');
      const cardText = document.createElement('div')
      const title = document.createElement('h2');
      const info = document.createElement('div');
      const read = document.createElement('div');
      const checkRead = document.createElement('input');
      const del = document.createElement('button');

      // set classes
      bookCard.className='book-card';
      book.read&&bookCard.classList.add('completed');
      !book.read&&bookCard.classList.remove('completed')

      title.className ='title';
      info.className = 'info';
      read.className = 'read';
      checkRead.className = 'checkRead';
      del.className ='del';
      cardText.className = 'text';

      // set attributes
      bookCard.setAttribute('id', book.id)
      checkRead.setAttribute('title', 'mark as read');
      checkRead.setAttribute('type', 'checkbox');
      checkRead.checked=book.read;

      // set Text content
      del.textContent = 'Delete';
      title.textContent = book.title;
      info.textContent = `Written by ${book.author}, ${book.pages} pages.`;

      // append to the document
      read.appendChild(checkRead)
      cardText.appendChild(title)
      cardText.appendChild(info)
      bookCard.appendChild(cardText)
      bookCard.appendChild(read)
      bookCard.appendChild(del)
      books.appendChild(bookCard)
    }
    // display books to the DOM
  function displayBooks(){
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'))
    myLibrary&&
    myLibrary.map(book =>{
     createBook(book)
      }
      )  
    } 

// add new book
addBookForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const title = addBookForm.querySelector('#title').value;
    const author = addBookForm.querySelector('#author').value;
    const pages = addBookForm.querySelector('#pages').value;
    const book = new Book(title, author, pages)
    book.addToLibrary();
  saveToLocal()
  createBook(book)
    clearForm()
    closeForm()
})
// save to local storage
function saveToLocal(){
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}
// delete book
function deleteBook (el){
  let deleted = el.parentElement;
  let id = deleted.id;
    deleted.remove()
    myLibrary = myLibrary.filter(book=>book.id!==id)
    saveToLocal()

}

// open form
function openForm(){
  document.querySelector('#add-book').classList.add('active')
}
// close form
function closeForm (){
  document.querySelector('#add-book').classList.remove('active')
}
// clear form
function clearForm(){
  addBookForm.querySelectorAll('input').forEach(input=>{
    input.value = "";
  })
}

// mark as read
function markAsRead (el) {
    let id = el.parentElement.parentElement.id;
    let data = myLibrary.find(element => element.id === id)
    data.read = el.checked;
    el.checked&&el.parentElement.parentElement.classList.add('completed');
    !el.checked&&el.parentElement.parentElement.classList.remove('completed')
    saveToLocal()
}
// event listeners
document.querySelector('#open-form').addEventListener('click',()=>{
  openForm()
})
document.querySelector('#close').addEventListener('click', ()=>{
  closeForm()
})
books.addEventListener('click', e => {
  if(e.target.classList.contains('checkRead'))
  markAsRead(e.target)
 else if(e.target.classList.contains('del'))
 deleteBook(e.target);
  return;
})
// el.checked && el.parentElement.parentElement.classList.add('completed')
// !el.checked && el.parentElement.parentElement.classList.remove('completed')
// display books when the page is loaded 
displayBooks()
