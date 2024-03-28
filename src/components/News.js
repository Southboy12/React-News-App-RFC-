import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

export default function News(props) {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=c24ce5d2d63c4b9f931fa78af8a031d8"
        const response = await fetch(url)
        const data = await response.json()
        setArticles(data.articles)
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData()
  }, [])
    
  return (
    <div>
        <div className="container my-3">
            <h2>Headlines</h2>
            <div className="row">
              {articles.map((article, index)=> {
                return <div className="col-md-4" key={index}>
                    <NewsItem title={article.title?article.title.slice(0, 50):""} description={article.description?article.description.slice(0, 50):""} img={!article.urlToImage?"https://ichef.bbci.co.uk/news/1024/branded_news/4D96/production/_133026891_bridgere.jpg":article.urlToImage} url={article.url}/>
                </div>
              })}
            </div>
        </div>   
    </div>
  );
}
