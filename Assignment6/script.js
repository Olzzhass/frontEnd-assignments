const nums = [10, 5, 20, 30, 15, 25, 40];

const sorted = nums.sort((a, b) => b - a);

const top3 = sorted.slice(0, 3);

console.log(top3);
