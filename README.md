# Country Data Viewer

This project is a simple web application that allows users to view information about countries. It fetches data from the REST Countries API and displays it in a user-friendly format. The application also attempts to detect the user's current country based on their IP address and display its data upon loading.

## Features

- **Search by Country Name**: Users can search for any country by typing its name in the search bar.
- **Display Country Information**: Shows country name, region, population, languages, currencies, and flag.
- **Neighboring Countries**: Displays information about the bordering countries of the searched country.
- **Auto-detect User's Country**: On page load, the application tries to detect the user's country using the `ipapi.co` API and displays its data.

## Project Structure

- `src/my.html`: The main HTML file that structures the web page.
- `src/style.css`: Contains all the styling rules for the application.
- `src/my.js`: The JavaScript file responsible for fetching data, manipulating the DOM, and handling user interactions.

## File Flow

### `src/my.html`

This file sets up the basic structure of the web page.

- It includes a `<head>` section with metadata, a title, and a link to `style.css`.
- The `<body>` contains:
    - A `div` with class `searchbar` which holds an `input` field (`#searchInput`) for country search and a `button` (`#searchButton`) to trigger the search.
    - A `div` with class `countries` where the country data cards will be dynamically inserted by JavaScript.
    - A `<script>` tag at the end of the `<body>` that links to `my.js`, ensuring the HTML content is loaded before the JavaScript tries to manipulate it.

### `src/style.css`

This file provides the visual styling for the application.

- It includes global resets for `margin`, `padding`, and `box-sizing`.
- Defines basic styles for `html` and `body`, including font, line height, background color, and layout (using flexbox to center content).
- Styles for the `.countries` container to arrange country cards.
- Detailed styling for individual `.country` cards, including `box-shadow`, `border-radius`, and text styles for `.country__name`, `.country__region`, and `.country__row`.
- Specific styles for the `.searchbar`, `#searchInput`, and `#searchButton` elements to ensure a clean and functional search interface.

### `src/my.js`

This is the core logic of the application.

1.  **DOM Element Selection**:
    - Selects the search input (`.searchInput`), search button (`#searchButton`), and the container for countries (`.countries`).

2.  **`getCountry(data)` Function**:
    - Takes country data (an object) as input.
    - Extracts `languages`, `currencies`, `flag`, `name`, `region`, and `population`.
    - Constructs an HTML `article` element representing a country card using a template literal.
    - Inserts this HTML into the `.countries` container.

3.  **`getCountryData(country)` Function**:
    - Initiates an AJAX request using `XMLHttpRequest` to `https://restcountries.com/v3.1/name/${country}` to fetch data for the specified country.
    - On successful load, it parses the JSON response.
    - Calls `getCountry()` to display the main country's data.
    - Extracts `borders` (neighboring countries) from the data.
    - For each neighbor, it makes another AJAX request to `https://restcountries.com/v3.1/alpha/${neighbour}` to fetch and display their data using `getCountry()`.

4.  **Initial Load - User's Country Detection**:
    - Uses `fetch` to `https://ipapi.co/json/` to get the user's IP-based location.
    - Once the location is retrieved, it fetches the country data for the detected country from `https://restcountries.com/v3.1/name/${userCountry}`.
    - Clears any existing content in `.countries` and then calls `getCountry()` to display the user's country data.
    - Includes error handling for network issues or invalid country data.

5.  **Search Functionality**:
    - An event listener is attached to `#searchButton` for `click` events.
    - When clicked, it clears the current content of `.countries`, gets the value from `#searchInput`, and calls `getCountryData()` with the entered country name.

## How to Run

1.  Save the `my.html`, `style.css`, and `my.js` files in the same directory (e.g., `src/`).
2.  Open `my.html` in your web browser.

The application will automatically try to detect your country and display its information. You can then use the search bar to look up other countries.
