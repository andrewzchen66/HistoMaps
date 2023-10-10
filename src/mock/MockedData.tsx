const csvData : { [key: string] : string[][]} = {
    "./desserts/path": 
        [["Dessert", "Calories", "Fat"], 
        ["Yoghurt", "50", "20%"], 
        ["Ice Cream", "20", "10%"], 
        ["Chocolate", "10", "5%"]],
    "./sports/path": 
        [["Sports", "Popularity", "State"], 
        ["Basketball", "10", "CA"], 
        ["Football", "9", "AZ"], 
        ["Hockey", "8", "TX"]],
    "./empty": [[""]],
}

export default csvData;