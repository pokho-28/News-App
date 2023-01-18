import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=68bde437d45d4509af83ccd2ed2ce8ea&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handleNextClick = async () => {
    console.log("next");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&apiKey=68bde437d45d4509af83ccd2ed2ce8ea&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };
  handlePrevClick = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&apiKey=68bde437d45d4509af83ccd2ed2ce8ea&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsHunt- Top Headlines</h1>
        {this.state.loading && <Spinner />}
        {!this.state.loading && (
          <div className="row">
            {this.state.articles?.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element?.title}
                    description={element?.description}
                    imageUrl={element?.urlToImage}
                    newsUrl={element?.url}
                    author={element?.author}
                    date={element?.publishedAt}
                    source={element?.source.name}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="container d-flex justify-content-between">
          <button
            className="btn btn-primary"
            onClick={this.handlePrevClick}
            disabled={this.state.page <= 1}
          >
            &#60; Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={this.handleNextClick}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next &#62;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
