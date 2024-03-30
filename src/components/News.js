import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

// import PropTypes from 'prop-types'

export default function News(props) {

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c24ce5d2d63c4b9f931fa78af8a031d8&page=${page}&pageSize=3`;
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles);
        setTotalPages(Math.ceil(data.totalResults / 3));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [page, props.country, props.category]);

  const prPage = async () => {
    setPage(page - 1);
  };

  const nxtPage = async () => {
    setPage(page + 1);
  };

  return (
    <div>
      <div className="container my-3">
        <h2>Headlines</h2>
        {/* {<Loading/>} */}
        <div className="row">
          {articles.map((article, index) => {
            return (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={article.title ? article.title.slice(0, 50) : ""}
                  description={
                    article.description ? article.description.slice(0, 50) : ""
                  }
                  img={
                    !article.urlToImage
                      ? "https://ichef.bbci.co.uk/news/1024/branded_news/4D96/production/_133026891_bridgere.jpg"
                      : article.urlToImage
                  }
                  url={article.url}
                />
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            disabled={page <= 1}
            onClick={prPage}
            className="btn btn-secondary"
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={nxtPage}
            className="btn btn-secondary"
          >
            &rarr; Next
          </button>
        </div>
      </div>
    </div>
  );
}
