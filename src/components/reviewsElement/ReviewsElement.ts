import { ReviewsResponse } from "../../entities/Review";
import { Service } from "../../services/Service";
import { createReviewElement } from "../reviewElement/ReviewElement";
import "./ReviewsElement.scss";

export async function createReviewsElement(
  movieId: number,
  article: HTMLElement
): Promise<void> {
  const reviews = await fetchMovieReviews(movieId);
  const reviewsContainer = createReviewsContainer(reviews);
  const numOfReviewsToShow = 2;

  if (reviews && reviews?.results.length) {
    reviews.results
      .slice(0, numOfReviewsToShow)
      .forEach((review) =>
        reviewsContainer.appendChild(createReviewElement(review))
      );
  }
  article.appendChild(reviewsContainer);
}

async function fetchMovieReviews(movieId: number) {
  const useCommonParams = true;

  const service = new Service<ReviewsResponse>(
    `movie/${movieId}/reviews`,
    useCommonParams
  );
  const reviews = await service.getEntities();
  return reviews;
}

function createReviewsContainer(reviews: ReviewsResponse) {
  const reviewsContainer = createReviewsSection();

  const reviewsTitle = createReviewsTitleElement(reviews);

  reviewsContainer.appendChild(reviewsTitle);

  return reviewsContainer;
}

function createReviewsTitleElement(reviews: ReviewsResponse) {
  const reviewsTitle = document.createElement("span");
  reviewsTitle.className = "movie-card__reviews-title";
  reviewsTitle.textContent = reviews?.results.length
    ? "Reviews"
    : "No reviews available";
  return reviewsTitle;
}

function createReviewsSection() {
  const reviewsContainer = document.createElement("section");
  reviewsContainer.className = "movie-card__reviews";
  return reviewsContainer;
}
