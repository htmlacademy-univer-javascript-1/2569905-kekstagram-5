function checkStringLength(str, inputNumber) {
  return str.length <= inputNumber;
}

function isPalindrome(str) {
  str = str.toLowerCase().replace(' ', '');
  return str === str.split('').reverse().join('');
}
