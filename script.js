// Using DummyJSON API which is very reliable for assignments
const API_URL = 'https://dummyjson.com/quotes/random';

const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const twitterBtn = document.getElementById('twitter-btn');
const loader = document.getElementById('loader');
const quoteCard = document.getElementById('quote-card');

// Show Loading Spinner
function showLoading() {
    loader.style.display = 'block';
    quoteCard.style.opacity = '0'; // Hide card content cleanly
    quoteCard.style.transform = 'translateY(20px)';
}

// Hide Loading Spinner
function hideLoading() {
    if (!loader.style.display) return;
    loader.style.display = 'none';
    quoteCard.style.opacity = '1';
    quoteCard.style.transform = 'translateY(0)';
}

async function getQuote() {
    showLoading();
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // Handling data structure from DummyJSON
        // API returns: { id: 1, quote: "...", author: "..." }
        const quote = data.quote;
        const author = data.author;

        // Check quote length to determine styling (make font smaller if text is long)
        if (quote.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.textContent = quote;
        authorText.textContent = author ? `- ${author}` : '- Unknown';

    } catch (error) {
        console.error('Whoops, no quote', error);
        // Fallback in case API fails (Important for assignments!)
        quoteText.textContent = "The only way to do great work is to love what you do.";
        authorText.textContent = "- Steve Jobs (Offline Mode)";
    } finally {
        // Delay slightly for smooth transition
        setTimeout(hideLoading, 300);
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
