export const parseCurrentURL = () => {
  const urlParts = {};

  [urlParts.region, urlParts.location, urlParts.action] = location.hash.slice(2).split('/');

  return urlParts;
};

