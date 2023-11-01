import { useState, useEffect } from "react";

function RandomQuote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();

      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];

        setQuote(randomQuote.text);
        setAuthor(randomQuote.author || "Unknown Author");
      } else {
        setQuote("No quotes available");
        setAuthor("Unknown Author");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation", error);
    }
  };

  const tweetQuote = () => {
    const tweetText = encodeURIComponent(`"${quote}" - ${author}`);
    const twitterURL = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.location.href = twitterURL;
  };

  return (
    <div>
      <div className="title">
        <h1>Quote Machine</h1>
      </div>
      <button onClick={fetchData}>Get Random Quote</button>
      <button onClick={tweetQuote}>Tweet this Quote</button>
      <div className="quotes">
        <div className="quoteText">
          <p>{quote}</p>
        </div>
        <div className="quoteAuthor">
          <p>{author}</p>
        </div>
      </div>
    </div>
  );
}

export default RandomQuote;
