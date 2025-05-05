import { Review } from "../../entities/Review";
import { handleNonValidImg, removeHtmlTags } from "../../helpers";
import "./ReviewElement.scss";

const textContentLimit = 90;

export function createReviewElement(reviewData: Review): HTMLElement {
  const fragment = document.createDocumentFragment();

  const review = createReviewArticle();
  const authorImg = createAuthorImageElement(reviewData);
  const author = createAuthorElement(reviewData);
  const updatedAt = createReviewUpdateTimeElement(reviewData);
  const meter = createReviewMeterElement(reviewData);
  const rating = createReviewRatingElement(reviewData);
  const content = createReviewContentElement(reviewData);
  var readMoreLink = createReviewLink(reviewData);

  fragment.appendChild(authorImg);
  fragment.appendChild(author);
  fragment.appendChild(updatedAt);
  fragment.appendChild(meter);
  fragment.appendChild(rating);
  if (readMoreLink) {
    content.appendChild(readMoreLink);
  }
  fragment.appendChild(content);

  review.appendChild(fragment);
  return review;
}

function createReviewArticle() {
  const review = document.createElement("article");
  review.className = "movie-details__review";
  return review;
}

function createAuthorImageElement(reviewData: Review) {
  const authorImg = document.createElement("img");
  authorImg.className = "movie-details__review-author-img";
  authorImg.src = `https://image.tmdb.org/t/p/w92${reviewData.author_details.avatar_path}`;
  authorImg.alt = reviewData.author;
  authorImg.onerror = (event) =>
    handleNonValidImg(event, "icons/circle-user.svg");
  return authorImg;
}

function createAuthorElement(reviewData: Review) {
  const author = document.createElement("span");
  author.className = "movie-details__review-author";
  author.textContent = `Review by ${reviewData.author}`;
  return author;
}

function createReviewUpdateTimeElement(reviewData: Review) {
  const updatedAt = document.createElement("time");
  updatedAt.className = "movie-details__review-updated-at";
  updatedAt.textContent = `Written on ${new Date(reviewData.updated_at).toDateString()}`;
  updatedAt.dateTime = reviewData.updated_at;
  return updatedAt;
}

function createReviewMeterElement(reviewData: Review) {
  const meter = document.createElement("meter");
  meter.className = "movie-details__review-meter";
  meter.value = reviewData.author_details.rating;
  meter.min = 0;
  meter.max = 10;
  return meter;
}

function createReviewRatingElement(reviewData: Review) {
  const rating = document.createElement("small");
  rating.className = "movie-details__review-rating";
  rating.textContent = reviewData.author_details.rating + " / 10";
  return rating;
}

function createReviewContentElement(reviewData: Review) {
  const content = document.createElement("p");
  content.className = "movie-details__review-content";
  content.textContent = removeHtmlTags(
    reviewData.content.slice(0, textContentLimit) + "..."
  );
  return content;
}

function createReviewLink(reviewData: Review) {
  let readMoreLink = null;
  const longTextInContent = reviewData.content.length > textContentLimit;
  if (longTextInContent) {
    readMoreLink = document.createElement("a");
    readMoreLink.onclick = (event) => event.stopPropagation();
    readMoreLink.className = "movie-details__review-read-more";
    readMoreLink.textContent = "read the full review";
    readMoreLink.href = reviewData.url;
    readMoreLink.target = "_blank";
    readMoreLink.rel = "noopener noreferrer";
  }
  return readMoreLink;
}
