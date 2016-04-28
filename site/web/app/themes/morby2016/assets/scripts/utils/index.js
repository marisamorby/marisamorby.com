export function debounce(func, wait = 200) {
  let timeout;

  return () => {
    const args = arguments;
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  };
}

/**
 * Prevents a function from firing too often.
 * @param  {Function} func  the function to throttle
 * @param  {Number}   limit the amount of milliseconds to wait between calls
 * @return {Function}       function to check if the function should be called
 */
export function throttle(func, limit = 200) {
  let wait = false;

  return () => {
    if (!wait) {
      func.call();
      wait = true;
      setTimeout(() => { wait = false; }, limit);
    }
  };
}

/**
 * Finds all shared values between two arrays in an efficient way. This
 * function is lifted almost verbatim from phant0m's answer on StackOverflow.
 *
 * NOTE: The arrays MUST contain the same types; mixed values WILL NOT work.
 *
 * @link http://stackoverflow.com/a/12437683/463471 phant0m on StackOverflow
 *
 * @param  {array} arrOne an array to compare
 * @param  {array} arrTwo another array to compare
 * @return {array}       matched values
 */
export function arrayIntersect(arrOne, arrTwo) {

  // Bail if the arrays aren't arrays.
  if (typeof arrOne.concat !== 'function' || typeof arrTwo.concat !== 'function') {
    console.error('intersect() requires arguments to be arrays or array-like objects.');
    console.dir(arrOne);
    console.dir(arrTwo);
    return [];
  }

  // Sort the arrays so the values match in order.
  const sortedA = arrOne.concat().sort();
  const sortedB = arrTwo.concat().sort();
  let commonValues = [];
  let iA = 0;
  let iB = 0;

  // Loop until we run out of values in one or both arrays.
  while (iA < arrOne.length && iB < arrTwo.length) {

    /*
     * If the values at the current indices match, add them to the common array
     * and increment both counters.
     */
    if (sortedA[iA] === sortedB[iB]) {
      commonValues.push(sortedA[iA]);
      iA++;
      iB++;
    }

    /*
     * If the values _don't_ match, only update the counter for the array with
     * the lower value.
     */
    else if (sortedA[iA] < sortedB[iB]) {
      iA++;
    } else {
      iB++;
    }
  }

  return commonValues;
}

export function toArray(val) {

  // Or array-like objects.
  let arr;

  if (typeof val.concat === 'function') {
    return val;
  }

  switch (typeof val) {

    case 'object':
      arr = Object.keys(val).map(key => val[key]);
      break;

    /*
     * This will help with strings and integers, but otherwise you'll probably
     * see unexpected results. It's only here to avoid an error.
     */
    default:
      arr = [val];
  }

  return arr;
}
