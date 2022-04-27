
# FreeNewsAPI JavaScript SDK

[![npm version](https://img.shields.io/npm/v/freenewsapi.svg?style=flat-square)](https://www.npmjs.com/package/freenewsapi)
[![npm downloads](https://img.shields.io/npm/dm/freenewsapi.svg?style=flat-square)](https://www.npmjs.com/package/freenewsapi)
[![license](https://img.shields.io/npm/l/freenewsapi.svg?style=flat-square)](LICENSE)
[![build](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](https://github.com/FreeNews-API/javascript-sdk)

The official **FreeNewsAPI SDK** for the JavaScript programming language. 

Easily access real-time and historical news articles and headlines from multiple sources around the world. 

---

## Installation

```bash
npm install freenewsapi
```

or

```bash
yarn add freenewsapi
```

## Usage
> FreeNewsAPI uses API keys for authentication. To get started, <a href="https://freenewsapi.com/signup" target="_blank">sign up for free</a> to get an API key

Next, import and initialize the SDK with your API key. 

```javascript
import NewsAPI from 'freenewsapi';

// Initialize the SDK
const newsApi = new NewsAPI('your-api-key');

// Basic search
newsApi.search({ q: 'bitcoin' })
  .then(results => console.log(results))
  .catch(err => console.error(err));

// Advanced search
newsApi.search({
  q: 'elon musk',
  lang: ['en', 'fr'],
  category: 'technology',
  max: 10,
  sortby: 'relevance'
})
  .then(results => console.log(results))
  .catch(err => console.error(err));
```

---

## API Reference

### `new NewsAPI(apiKey)`

Creates a new instance of the NewsAPI client.

- `apiKey` (string, required): Your FreeNewsAPI API key.

---

### `newsApi.search(options)`

Search for news articles based on various filters and options.
🔗 [See Full API Documentation](https://freenewsapi.com/documentation#search-endpoint)  


#### Parameters:

- `options` (object):
  - `q` (string): Keywords to search for.
  - `startDate` (string | Date): Start date for search (format: `YYYY-MM-DD` or `YYYY-MM-DD HH:MM:SS` or a JavaScript `Date` object).
  - `endDate` (string | Date): End date for search (format: `YYYY-MM-DD` or `YYYY-MM-DD HH:MM:SS` or a JavaScript `Date` object).
  - `content` (boolean): Whether to include full article content.
  - `lang` (string | string[]): Language(s) to filter by (e.g., `'en'`, `['en', 'fr']`).
  - `country` (string | string[]): Country/countries to filter by (ISO 3166-1 alpha-2 codes).
  - `region` (string | string[]): Region(s) to filter by.
  - `category` (string | string[]): Category/categories to filter by (e.g., `'technology'`, `'sports'`).
  - `max` (number): Maximum number of results to return.
  - `attributes` (string | string[]): Specific attributes to search in (`title`, `description`, `content`).
  - `page` (number): Page number for pagination.
  - `sortby` (string): Sort results by `'publishedAt'` or `'relevance'`.
  - `publisher` (string | string[]): Filter by publisher(s).
  - `format` (string): Response format (`'json'`, `'csv'`, or `'xlsx'`).

#### Returns:

- `Promise<Object>`: Resolves with the search results.

---

### Notes:
- `startDate` and `endDate` accept either a **string** (`YYYY-MM-DD`) or a **DateTime** string (`YYYY-MM-DD HH:MM:SS`)
- When `content: true`, full article content will be included.
- If `format` is set to `'csv'` or `'xlsx'`, results will be returned in the corresponding format (binary response handling required).

---

## Links

- 📚 [API Documentation](https://freenewsapi.com/documentation)
- 🐛 [Report Issues](https://github.com/FreeNews-API/javascript-sdk/issues)
- 🌟 [Star the Project](https://github.com/FreeNews-API/javascript-sdk)

## Development

To build the project locally:

```bash
npm install
npm run build
```

The output files will be generated in the `dist/` folder.

## License

[MIT](LICENSE)
