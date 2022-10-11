import React, { Component } from "react";
import "./NewsItem.css";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div>
        <div
          className="card my-3"
          style={{ height: "28rem", overflowY: "scroll", overfolwX: "hidden" }}
        >
          <img
            src={
              !imageUrl
                ? "https://st.depositphotos.com/1006899/3776/i/950/depositphotos_37765339-stock-photo-news.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <p className="card-text">
              <small className="text-muted">
                By:{!author ? "Unkown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <h5 className="card-title">
              {title}{" "}
              <span className="badge badge-pill bg-warning">{source}</span>
            </h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
