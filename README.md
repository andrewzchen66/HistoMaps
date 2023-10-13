# Mock Documentation

## Contributers

Andrew Chen: azchen

Allen Wang: awang299

Total Estimated Time: 15 hours

## Downloading and Setup

1. Navigate to the following github repo and clone to your local machine:
   "https://github.com/cs0320-f23/mock-awang299-azchen.git"

2. Run "npm install" to install required dependencies

3. Run "npm start" to start the frontend application. You can navigate to http://localhost:8000/ in a web-browser to interact with the UI.

## Functionality

The web application's main functionality is to aid a real estate appraiser in processing and exploring data from a CSV file. The application is a terminal-like interface with an input box and history display. There are several commands that are supported, any other commands entered that don't fit the specifications will produce invalid output. Both valid and invalid outputs will be stored and displayed in the history.

### mode (displayType)

Users can choose between "mode brief" or "mode verbose" when displaying output. Brief will display only the output, verbose will display the command and output on two lines.

### load_file (filePath) (containsHeader?)

Users can load a csv file into the application to perform view and search on using its filepath, and can optionally specify if the file contains a header with "true" or "false" argument. Default if unspecified is true. Returns invalid output if filepath doesn't exist.

### view

Users can view the contents of file in a readable table format. Returns invalid output if no file has been successfully loaded yet.

### search (column?) (value)

Users can search and filter the contents of a file for rows that contain the value being searched for in the specified column, if column is provided. If not, just search for the value in the entire table. The column can argument can be the name of the header or the column index if no header exists. Displays the header (if it exists) and the searched rows in a readable table format. Returns invalid output if no file has been successfully loaded yet, or if column doesn't exist.

## State Variables

### history

Array of CommandInfos that maintains the ordering and corresponding metadata for every command inputed by the user. Each CommandInfo interface contains the command string, the output which is either a string or TableOutput, and boolean isBrief for whether the info should be displayed in brief or verbose mode.

### commandString

String representing the current command being entered in REPLInput. Gets parsed and interpreted after user submits inside the handleSubmit() function.

### filePath

String representing the current filepath loaded. The starting filepath with nothing loaded is "". Changes when load_file command is called.

### isBrief

Boolean representing what the current mode is. Default is true because the app starts out in brief mode. Changes when mode command is called.

### containsHeader

Boolean representing if the currently loaded csv has a header. Default is true. Changes when load_file command is called.

## Components

### REPL

Component that formats the REPLHistory and REPLInput components in relation to each other on the page. Initializes the history state variable, which will be passed via props to the corresponding components. We initialized state on this level because REPLInput needs to modify the history when new input is given, and REPLHistory needs to update based on when the history state is modified.

### REPLInput

Component that provides interface for user to submit commands. Gets passed in props contains the history state and its setter which is needed to change the state of the current command on user submission so that history can store the correct new command information. Contains ControlledInput and Button components, and defines the handleSubmit function to be executed when user submits. HandleSubmit() contains logic for mode, load_file, view, and search commands by calling MockAPICalls and displaying proper exception handling. Initializes the commandString string state representing what current submission is, the filePath string state representing the current filePath (if any) that's loaded, the isBrief boolean state representing whether the current mode is brief of verbose, and the containsHeader boolean state representing whether the currently loaded csv contains a header. This data can be initialized inside REPLInput because it will be added to the history state variable as metadata, so REPLHistory will still obtain the info.

### ControlledInput

Component that renders the input box for REPLInput. Gets passed a value state variable and its setter to be displayed and to change when user types, an ariaLabel for Playwright testing, and onSubmit function to execute when user submits.

### REPLHistory

Component that renders a scrollable history display. The only prop needed is the history state, as the REPLHistory's only job is to rerender the history display instead of changing the history. We use .map on the history array to render TSX for each history using it's contained metadata.

## Mocking

To be able to develop and test our frontend functionality without access to a working backend, we relied on extensive mocking to simulate the backend logic. Our frontend components will call functions from MockAPICalls that will fetch and process the mock data from MockedData.tsx, and return it in a homogenous format similar to how an API query would return.

### MockedData.tsx

This file contains hashmaps that will map certain inputs to the corresponding simulated output that a functional backend should hypothetically return. This mocked data will only be accessed by MockedAPICalls.tsx so as to fully simulate the mocking of the backend.

The csvData is a hashmap mapping filepath strings to an array of strings representing the entire CSV data in table format. Is it used in load_file to check that the csv file exists, and view to display the entire file.

The searchColumnData is a hashmap of nested hashmaps of nested hashmaps, which is specifically used to mock search queries with a column provided. The first key level is the filepath, the second is the column, and the third is the value being searched.

The searchAllData is a hashmap of nested hashmaps, which is specifically used to mock search queries with no column provided. The first key level is the filepath and the second is the value being searched.

### MockAPICalls

All of the mocked noncomponent functions in this file will return a FetchedAPIData structure containing a success boolean, and a message that will be displayed in the history which is either a string or array of strings. The functions mockViewCSV, mockSearchCSV, and mockLoadCSV simulate the respective commands in their names by fetching the mocked data from the hashmaps in MockedData.tsx. There is some exception handling logic built into these mocks to succintly simulate a more robust backend implementation.

## Testing

We used Playwright to script state interactions to be able to test the frontend. To run the test suite, enter the following:

"npm install playwright"

"npx playwright test"

We performed specific tests that would execute on-load of the web app to test that the initial format of the page is accurate and all the components exist.

We also wrote "unit tests" to test the specific functionality when mode, load_file, view, and search commands are entered. This ensures that the functionality of these commands in isolation produce the expected UI results, both for successes and errors. An example of this for mode would be testing that the initial mode is brief, that calling mode brief would keep it brief, and that calling mode verbose would switch to verbose.

We also implemented "integration tests" where we could make numerous calls to different commands in sequence to test their interactions with each other. An example would be loading a file then viewing it, then loading a different file and viewing the new file. This testing scheme enables us to test the functionality's depth through detailed testing of edge cases for each command, as well as breadth through integrating various sequences together.
