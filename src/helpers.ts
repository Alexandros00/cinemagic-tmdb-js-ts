/**
 * Function to handle the error when an image is not valid.
 * @param event The event that triggered the error.
 * @param imagePath The path to the image to be displayed in case of an error.
 * @returns Void.
 */
export function handleNonValidImg(
  event: Event | string,
  imagePath?: string
): void {
  if (typeof event === "string") {
    return;
  }
  const target = event.target as HTMLImageElement;
  target.onerror = null;
  target.src = imagePath ?? "default_placeholder.png";
}

/**
 * Debounce function to limit the number of times a function is called.
 * @param callbackFn The function to be called after the delay.
 * @param delay The delay in milliseconds.
 * @returns A function that will call the callbackFn after the delay.
 */
export function debounce<T extends any[]>(
  callbackFn: (...args: T) => void,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...rest: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callbackFn(...rest);
    }, delay);
  };
}

// I took the regex as it from this StackOverflow answer: https://stackoverflow.com/a/5002161
/**
 * Function to remove HTML tags from a string.
 * @param htmlString The string that contains HTML tags.
 * @returns The string without HTML tags.
 */
export function removeHtmlTags(htmlString: string): string {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
}
