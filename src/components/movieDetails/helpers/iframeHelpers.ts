import { Video, VideosResponse } from "../../../entities/Video";
import { Service } from "../../../services/Service";
import "../MovieDetails.scss";

export async function createIframeContainerElement(
  movieId: number,
  article: HTMLElement
): Promise<void> {
  const video = await fetchMovieVideos(movieId);

  if (!video) return;

  const iframeContainer = createIframeContainer(video);
  article.appendChild(iframeContainer);
}

async function fetchMovieVideos(movieId: number) {
  const service = new Service<VideosResponse>(`movie/${movieId}/videos`);
  const videos = await service.getEntities();
  return videos.results
    .filter((video) => video.site === "YouTube")
    .find((video) => video.type === "Trailer");
}

function createIframeContainer(video: Video) {
  const iframeContainer = document.createElement("div");
  iframeContainer.className = "movie-card__iframe-container";
  const iframe = document.createElement("iframe");
  iframe.className = "movie-card__iframe";
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  iframe.width = "100%";
  iframe.allow = "picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.title = "video.name";
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer";
  iframe.setAttribute(
    "sandbox",
    "allow-scripts  allow-same-origin allow-presentation"
  );
  iframeContainer.appendChild(iframe);

  return iframeContainer;
}
