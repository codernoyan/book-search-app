import './style.css'

const loadBooks = async(volumeName) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${volumeName}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.items;
}

const displayProducts = async(bookVolumeName) => {
  const bookData = await loadBooks(bookVolumeName);
  // console.table(bookData);
  const booksContainer = document.getElementById('books__container')
  bookData.forEach(book => {
    console.log(book.volumeInfo);

    const { title, imageLinks, authors, subtitle, publisher, description } = book.volumeInfo;
    const { thumbnail } = imageLinks;

    const div = document.createElement('div');
    div.innerHTML = `
      <div class="overflow-hidden border border-gray-100 rounded-lg grid grid-cols-1 group sm:grid-cols-3" href="">
          <div class="relative">
            <img class="absolute inset-0 object-cover w-full h-full" src=${thumbnail} alt="" />
          </div>

          <div class="p-5 sm:col-span-2">
            <ul class="flex space-x-1">
              <li class="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">${publisher}</li>

              <li class="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
                Information
              </li>
            </ul>

            <h5 class="mt-4 font-bold">${title}</h5>

            <p class="mt-2 text-sm text-gray-500">${description.slice(0, 100) + '...'}</p>
            <div class="mt-4">
              <button onclick="addToCart()" class="relative inline-block px-8 py-2 overflow-hidden border border-indigo-600 group focus:outline-none focus:ring rounded-sm">
              <span class="absolute inset-y-0 left-0 w-[2px] transition-all bg-indigo-600 group-hover:w-full group-active:bg-indigo-500"></span>
            
              <span class="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
              Add to Cart
            </span>
            </button>
            </div>
          </div>
        </div>
    `;
    booksContainer.appendChild(div);
   
  })
}

const addToCart = () => {
  
}

displayProducts('programming')

// loadBooks('quilting');