// Listen for form submit
document.querySelector('#myForm').addEventListener('submit', saveBookmark);

/////////////////////////////////////////////////////////////////////////
// Save Bookmark
function saveBookmark(e) {
//   Get form values
    let siteName = document.querySelector('#siteName').value;
    let siteUrl = document.querySelector('#siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    let bookmark = {
        name: siteName,
        url: siteUrl
    }
    /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    // Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        // Init array
        let bookmarks = [];
        // Adding to array
        bookmarks.push(bookmark);
        // Setting to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localStorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Adding bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear Form
    document.querySelector('#myForm').reset();

    //  Re-fetch bookmarks
    fetchBookmarks();

    // Prevent form from submitting
    e.preventDefault();
}

/////////////////////////////////////////////////////////////////////////
// Deleting the bookmark
function deleteBookmark (url) {
    // Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Looping through bookmarks
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // Remove from array
            bookmarks.splice(i, 1);
        } 
    }
     // Re-set back to localStorage
     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //  Re-fetch bookmarks
    fetchBookmarks();
}

/////////////////////////////////////////////////////////////////////////
// Fetching bookmarks
function fetchBookmarks () {
     // Get bookmarks from localStorage
     let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //  Get output id
    let bookmarksResults = document.querySelector('#bookmarksResults');
    // Building an output
    bookmarksResults.innerHTML = '';
        for (let book of bookmarks) {
            let name = book.name;
            let url = book.url;
            bookmarksResults.innerHTML += `
            <div class="card bg-light text-dark card-body">
            <h3>${name}
            <a href="${url}" class="btn btn-success" target="_blank">Visit</a>
            <a onclick="deleteBookmark('${url}')" href="#" class="btn btn-danger">Delete</a>
            </h3>
            </div>
            `;
        }
}

// Validating Form
function validateForm(siteName, siteUrl) {
    if ( !siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }
    // Checking the validation for url
    let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}