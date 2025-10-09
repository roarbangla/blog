export const getArticles = async (page=1, perPage = 12) => {
  const response = await fetch(`/api/articles?page=${page}&perPage=${perPage}`);
  const data = await response.json();
  return data;
}