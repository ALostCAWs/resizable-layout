export function checkArrayOfObjectImagesEqual(oldImageArray, newImageArray) {
  for (const [i, oldImage] of oldImageArray.entries()) {
    if (!checkObjectImagesEqual(oldImage, newImageArray[i])) {
      return false;
    }
  }

  return true;
}

export function checkObjectImagesEqual(oldImage, newImage) {
  for (const key in oldImage) {
    //console.log(oldImage[key]);
    if (oldImage[key] !== newImage[key]) {
      console.log(oldImage[key] !== newImage[key]);
      return false;
    }
  }
  return true;
}

export default { checkArrayOfObjectImagesEqual, checkObjectImagesEqual };