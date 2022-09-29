let day31Array = [];
let day30Array = [];
let day29Array = [];
let day28Array = [];
let monthArray = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let yearArray = [];

const numberToString = month => {
  switch (month) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
    default:
      return null;
  }
};

const stringToNumber = month => {
  switch (month) {
    case 'January':
      return 1;
    case 'February':
      return 2;
    case 'March':
      return 3;
    case 'April':
      return 4;
    case 'May':
      return 5;
    case 'June':
      return 6;
    case 'July':
      return 7;
    case 'August':
      return 8;
    case 'September':
      return 9;
    case 'October':
      return 10;
    case 'November':
      return 11;
    case 'December':
      return 12;
    default:
      return null;
  }
};

for (let i = 0; i < 31; i++) {
  day31Array.push(i + 1);
}
for (let i = 0; i < 30; i++) {
  day30Array.push(i + 1);
}
for (let i = 0; i < 29; i++) {
  day29Array.push(i + 1);
}
for (let i = 0; i < 28; i++) {
  day28Array.push(i + 1);
}
for (let i = 1900; i <= 2022; i++) {
  yearArray.push(i);
}

export {
  day31Array,
  day30Array,
  day29Array,
  day28Array,
  monthArray,
  yearArray,
  stringToNumber,
  numberToString,
};
