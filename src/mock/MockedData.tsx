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
};

// filePath: {column : {value}}
export const searchData: {
  [key: string]: {
    [key: string | number]: string[][] | { [key: string]: string[][] };
  };
} = {
  "./desserts/path": {
    // basic searches
    Calories: {
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
    Dessert: {
      Chocolate: [
        ["Dessert", "Calories", "Fat"],
        ["Chocolate", "10", "5%"],
      ],
      Yoghurt: [
        ["Dessert", "Calories", "Fat"],
        ["Yoghurt", "50", "20%"],
      ],
    },
    Fat: {},
  },
  "./sports/path": {
    // search value without column provided
    "9": [
      ["Sports", "Popularity", "State", "Stat"],
      ["Basketball", "10", "CA", "9"],
      ["Football", "9", "AZ", "1"],
      ["Hockey", "8", "TX", "9"],
    ],
    Stat: {
      // same search value with column provided
      "9": [
        ["Sports", "Popularity", "State", "Stat"],
        ["Basketball", "10", "CA", "9"],
        ["Hockey", "8", "TX", "9"],
      ],
    },
    // Nonexistent search values with headers
    State: {
      MA: [["Sports", "Popularity", "State", "Stat"]],
      Hockey: [["Sports", "Popularity", "State", "Stat"]],
    },
    Quidditch: [["Sports", "Popularity", "State", "Stat"]],
    Sports: {},
    Popularity: {},
  },
  "./no_header_sports/path": {
    // search by column with index
    0: {},
    1: {
      "10": [["Basketball", "10", "CA", "9"]],
      // Nonexistent search values without headers
      "5": [[]],
    },
    2: {},
    3: {},
  },
  "./empty": {},
};
