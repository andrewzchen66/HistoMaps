// maps filePath to csv contents
export const csvData: { [key: string]: string[][] } = {
  "./desserts/path": [
    ["Dessert", "Calories", "Fat"],
    ["Yoghurt", "50", "20%"],
    ["Ice Cream", "20", "10%"],
    ["Chocolate", "10", "5%"],
    ["Cake", "20", "20%"],
  ],
  "./sports/path": [
    ["Sports", "Popularity", "State", "Stat"],
    ["Basketball", "10", "CA", "9"],
    ["Football", "9", "AZ", "1"],
    ["Hockey", "8", "TX", "9"],
  ],
  "./no_header_sports/path": [
    ["Basketball", "10", "CA", "9"],
    ["Football", "9", "AZ", "1"],
    ["Hockey", "8", "TX", "9"],
  ],
  "./empty": [[]],
  "./single_col": [["hello"], ["world"], ["123"]],
};

// Searches with column provided
// {filePath: {column : {value: result}}}
export const searchColumnData: {
  [key: string]: {
    [key: string | number]: { [key: string]: string[][] };
  };
} = {
  "./desserts/path": {
    // basic searches
    "Fat": {
      "20%": [
        ["Dessert", "Calories", "Fat"],
        ["Yoghurt", "50", "20%"],
        ["Cake", "20", "20%"],
      ],
      "10%": [
        ["Dessert", "Calories", "Fat"],
        ["Ice Cream", "20", "10%"],
      ],
    },
    // basic searches
    "Dessert": {
      "Chocolate": [
        ["Dessert", "Calories", "Fat"],
        ["Chocolate", "10", "5%"],
      ],
      "Yoghurt": [
        ["Dessert", "Calories", "Fat"],
        ["Yoghurt", "50", "20%"],
      ],
    },
    "Calories": {},
  },
  "./sports/path": {
    "Stat": {
      // search value with column provided
      "9": [
        ["Sports", "Popularity", "State", "Stat"],
        ["Basketball", "10", "CA", "9"],
        ["Hockey", "8", "TX", "9"],
      ],
    },
    // Nonexistent search values with headers
    "State": {
      "MA": [[]],
      "Hockey": [[]],
    },
    "Sports": {},
    "Popularity": {},
  },
  "./no_header_sports/path": {
    // search by column with index
    0: {},
    1: {
      10: [["Basketball", "10", "CA", "9"]],
      9: [["Football", "9", "AZ", "1"]],
      8: [["Hockey", "8", "TX", "9"]],
      // Nonexistent search values without headers
      5: [[]],
    },
    2: {},
    3: {},
  },
  "./empty": {},
  "./single_col": {},
};

// Searches without column provided
// {filePath: {value : result}}
export const searchAllData: {
  [key: string]: {
    [key: string | number]: string[][];
  };
} = {
  "./sports/path": {
    // search value without column provided
    "9": [
      ["Sports", "Popularity", "State", "Stat"],
      ["Basketball", "10", "CA", "9"],
      ["Football", "9", "AZ", "1"],
      ["Hockey", "8", "TX", "9"],
    ],
    // No matches with header
    "Quidditch": [[]],
  },
  // No matches without header
  "./no_header_sports/path": {
    "Quidditch": [[]],
  },
  "./desserts/path": {},
  "./empty": {},
  "./single_col": {},
};
