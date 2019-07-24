// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    fetchAllQuotes();

});

const quotesURL = "http://localhost:3000/quotes?_embed=likes"
const quoteList = document.querySelector("div#quote-list")

const fetchAllQuotes = () => {
    fetch(quotesURL)
    .then(resp => resp.json())
}

const renderAllQuotes = json => {
  quoteList.innerHTML = ""
  json.forEach(quote => {renderQuote(quote)})
}

const renderQuote = (quote) => {
  const card = document.createElement('li')
  card.className = "quote-card"
  

  const blockQuote = document.createElement("blockquote")
  blockQuote.className = "blockquote"

  const pQuote = document.createElement('p')
  pQuote.className = "mb-0"
  pQuote.innerText = `${quote.quote}`

  const footer = document.createElement("footer")
  footer.className = "blockquote-footer"
  footer.innerText = quote.author

  const breaker = documnet.createElement("br")

  const btnSuccess = document.createElement('span')
  btnSuccess.innerHTML = `<button class="btn-success">Likes: <span>${quote.likes.length}</span></button>`
  btnSuccess.addEventListener("click", () => hadleLikeClick(quote))


  const btnDanger = document.createElement('button')
  btnDanger.className = "btn-danger"
  btnDanger.innerText = "Delete"
  btnDanger.addEventListener('click', () => {
    fetch(`http://localhost:3000/quotes/${quote.id}`, {
      method: "DELETE"
    }).then(fetchQuotes());
  })

  blockQuote.append(pQuote, footer, breaker, btnSuccess, btnDanger)
  card.appendChild(blockQuote)
  quoteList.appendChild(card)

 }
 const handleLikeClick = (quote) => {
   console.log(quote)
   fetch("http://localhost:3000/likes", {
        method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify( {
       quoteId: quote.id
    })
    })
    .then(fetchQuotes())
  }
