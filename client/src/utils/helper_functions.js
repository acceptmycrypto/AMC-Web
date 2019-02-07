export function handleLongDescription(description, maxChar, index) {
  let trimmedDescription = description.trim();
  if (trimmedDescription.length > maxChar) {
    return trimmedDescription.substring(0, trimmedDescription.indexOf(' ', index)) + "...";
  } else {
    return description
  }
}