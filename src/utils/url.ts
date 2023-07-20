/*Check url valid or not */
export const isUrlValid = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

/*Check if long url already exist or not*/
export const isUrlAlreadyAdded = (url: string, store: []) => {
  const founded = store.find((element: any) => element.originalUrl === url)
  if (founded) {
    return true
  }
  else {
    return false
  }
}