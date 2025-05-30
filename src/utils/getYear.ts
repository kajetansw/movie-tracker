export const getYear = (releaseDate: string) => {
  const year = new Date(releaseDate).getFullYear();

  return !isNaN(year) ? `${year}` : "";
};
