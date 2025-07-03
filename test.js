function reverse(number) {
    const strNumber = String(number)
    let len = strNumber.length;
    let reverseNumber = '';
    while(len >= 1) {
        reverseNumber+= strNumber[len-1];
        len = len-1;
    }
    console.log(parseInt(reverseNumber));
}

reverse(12340);