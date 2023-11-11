import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
 

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8031978280a2498e88ae9fa13dab21b7&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
   
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsStation`;
    updateNews();
    // eslint-disable-next-line
  }, [page]); // Include 'page' as a dependency to re-fetch data when the page changes

  const handleNextClick = () => {
    setPage(page + 1);
  };

  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
        NewsStation - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>

      <div className="container">
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title : ''}
                description={element.description ? element.description : ''}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-primary mr-2" onClick={handlePrevClick} disabled={page === 1}>
            Previous
          </button>
          <button className="btn btn-primary" onClick={handleNextClick} disabled={articles.length === 0}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default News;
