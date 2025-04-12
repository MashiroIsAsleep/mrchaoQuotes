document.addEventListener('DOMContentLoaded', () => {
    fetch('quotes.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => renderQuotes(data))
      .catch(error => {
        console.error('Error fetching quotes:', error);
        const container = document.getElementById('quotes-container');
        container.innerHTML = '<p>Sorry, there was an error loading the quotes.</p>';
      });
  });
  
  function renderQuotes(quotes) {
    const container = document.getElementById('quotes-container');
  
    // biome-ignore lint/complexity/noForEach: <explanation>
      quotes.forEach(item => {
      // Create a card for each quote
      const card = document.createElement('div');
      card.className = 'quote-card';
  
      // Quote text
      const quoteText = document.createElement('p');
      quoteText.className = 'quote-text';
      quoteText.textContent = `"${item.quote}"`;
  
      // Author name
      const author = document.createElement('p');
      author.className = 'quote-author';
      author.textContent = `- ${item.author}`;
  
      // Evidence screenshot if available
      let evidenceImg;
      if (item.screenshot && item.screenshot.trim() !== "") {
        evidenceImg = document.createElement('img');
        evidenceImg.className = 'evidence';
        evidenceImg.src = item.screenshot;
        evidenceImg.alt = `Evidence for quote by ${item.author}`;
      }
  
      // Append children to card
      card.appendChild(quoteText);
      card.appendChild(author);
      if (evidenceImg) {
        card.appendChild(evidenceImg);
      }
  
      container.appendChild(card);
    });
  }