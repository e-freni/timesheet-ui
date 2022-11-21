export function getStandardModalsWidth() {
  let width = '50%';
  if (window.innerWidth < 700) {
    width = '90%';
  }
  return width;
}

export function getSmallModalsWidth() {
  let width = '25%';
  if (window.innerWidth < 700) {
    width = '90%';
  }
  return width;
}
