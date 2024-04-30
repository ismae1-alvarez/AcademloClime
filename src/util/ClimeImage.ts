

function ClimeImage(clime:number) {
    let numberImage


    if (clime < 10) {
        numberImage = 1;
    } else if (clime < 20) {
        numberImage = 2;
    } else if (clime < 25) {
        numberImage = 3;
    } else if (clime < 30) {
        numberImage = 4;
    }
  return numberImage
}

export default ClimeImage