export const getPages = (numberStarlings: number, active: number) => {
  const pages = [];
  if (numberStarlings <= 5) {
    for (let i = 1; i <= numberStarlings; i++) {
      pages.push(i);
    }
    return pages;
  }
  if (active === 1) {
    pages.push(1, 2, 3, '...', numberStarlings);
    return pages;
  }
  if (active === 2) {
    pages.push(1, 2, 3, '...', numberStarlings);
    return pages;
  }
  if (active === numberStarlings) {
    pages.push(1, '...', numberStarlings - 2, numberStarlings - 1, numberStarlings);
    return pages;
  }
  if (active === numberStarlings - 1) {
    pages.push(1, '...', numberStarlings - 2, numberStarlings - 1, numberStarlings);
    return pages;
  }
  pages.push(1, '...', active - 1, active, active + 1, '...', numberStarlings);
  return pages;
};


export const nullFunction = () => null;


