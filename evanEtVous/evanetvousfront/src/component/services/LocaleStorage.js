export function removeItem(itemToRemove) {
  localStorage.removeItem(itemToRemove);
}

export function getItem(item) {
  return localStorage.getItem(item);
}

export function addItem(localStorageName, newItem) {
  localStorage.setItem(localStorageName, newItem);
}
