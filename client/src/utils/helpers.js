
  export function checkText(input) {
    const text = /^.+$/;
    if (input.match(text)) {
      return true;
    }
    return false;
  }