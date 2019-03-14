export function handleLongDescription(description, maxChar, index) {
  let trimmedDescription = description.trim();
  
  if (trimmedDescription.length > maxChar && trimmedDescription.indexOf(' ', index) !== -1) {
    return trimmedDescription.substring(0, trimmedDescription.indexOf(' ', index)) + "...";
  } else if(trimmedDescription.length > maxChar){
    return trimmedDescription.substring(0, index) + "...";
  }else {
    return description;
  }
}