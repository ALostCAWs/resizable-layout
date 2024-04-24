const returnSortNumber = (a, b) => {
  if (a > b) {
    return 1;
  }
  else if (a < b) {
    return -1;
  }
  return 0;
}

export function sortTankArray(a, b) {
  return returnSortNumber(a.id, b.id);
}

export function sortGeneraArray(a, b) {
  return returnSortNumber(a.genus, b.genus);
}

export function sortSpeciesArray(a, b) {
  return returnSortNumber(a.species, b.species);
}

export function sortParametersArray(a, b) {
  return returnSortNumber(a.parameter, b.parameter);
}

export default {sortGeneraArray, sortSpeciesArray};