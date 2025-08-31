/**
 * AllNewsAPI SDK - A simple JavaScript wrapper for AllNewsAPI
 * @author AllNewsAPI
 * @license MIT
 * @description This SDK provides a simple interface to interact with the AllNewsAPI, allowing you to search for news articles based on various parameters.
 * @see https://allnewsapi.com/docs for the API documentation.
 * @version 1.0.0
 */

class NewsAPI {
    /**
     * Create a new instance of the NewsAPI client
     * @param {string} apiKey - Your AllNewsAPI key
     * @param {Object} config - Optional configuration options
     * @param {string} config.baseUrl - The base URL for the API (default: https://api.allnewsapi.com)
     */
    constructor(apiKey, config = {}) {
        if (!apiKey) {
        throw new Error("API key is required");
        }

        this.apiKey = apiKey;
        this.baseUrl = config.baseUrl || "https://api.allnewsapi.com";
        this.searchEndpoint = `${this.baseUrl}/v1/search`;
        this.headlinesEndpoint = `${this.baseUrl}/v1/headlines`;
    }
  
    /**
     * Build the URL with query parameters for the API request
     * @param {Object} params - Query parameters for the search
     * @returns {string} - The complete URL for the API request
     * @private
     */
    _buildUrl(params = {}, endpoint = this.searchEndpoint) {
      const url = new URL(endpoint);
      
      // Add API key
      url.searchParams.append("apikey", this.apiKey);
      
      // Add other parameters if provided
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          // Handle array values by joining them with commas
          if (Array.isArray(value)) {
            url.searchParams.append(key, value.join(","));
          } else {
            url.searchParams.append(key, value.toString());
          }
        }
      });
      
      return url.toString();
    }
  
    /**
     * Make a request to the API
     * @param {Object} params - Query parameters for the request
     * @returns {Promise<Object>} - The API response
     * @private
     */
    async _makeRequest(params = {}, endpoint = this.searchEndpoint) {
      const url = this._buildUrl(params, endpoint);
      
      try {
        const response = await fetch(url);
        
        // Handle HTTP errors
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new NewsAPIError(
            response.status,
            errorData?.detail?.message || errorData?.message || this._getErrorMessage(response.status)
          );
        }
        
        // Handle different formats
        const format = params.format || "json";
        
        if (format === "json") {
          return await response.json();
        } else if (format === "csv" || format === "xlsx") {
          return await response.blob();
        }
        
        return await response.text();
      } catch (error) {
        if (error instanceof NewsAPIError) {
          throw error;
        }
        throw new NewsAPIError(500, `Request failed: ${error.message}`);
      }
    }
  
    /**
     * Get an error message based on status code
     * @param {number} statusCode - HTTP status code
     * @returns {string} - Error message
     * @private
     */
    _getErrorMessage(statusCode) {
      const errorMessages = {
        400: "Bad Request - Your request is invalid",
        401: "Unauthorized - Invalid API Key or Account status is inactive",
        403: "Forbidden - Your account is not authorized to make that request",
        429: "Too Many Requests - You have reached your daily request limit. The next reset is at 00:00 UTC",
        500: "Internal Server Error - We had a problem with our server. Please try again later",
        503: "Service Unavailable - We're temporarily offline for maintenance. Please try again later"
      };
      
      return errorMessages[statusCode] || "Unknown error occurred";
    }
  
    /**
     * Search for news articles
     * @param {Object} options - Search options
     * @param {string} [options.q] - Keywords to search for
     * @param {string|Date} [options.startDate] - Start date (YYYY-MM-DD or Date object)
     * @param {string|Date} [options.endDate] - End date (YYYY-MM-DD or Date object)
     * @param {boolean} [options.content] - Whether to include full content
     * @param {string|string[]} [options.lang] - Language(s) to filter by
     * @param {string|string[]} [options.country] - Country/countries to filter by
     * @param {string|string[]} [options.region] - Region(s) to filter by
     * @param {string|string[]} [options.category] - Category/categories to filter by
     * @param {number} [options.max] - Maximum number of results (1-100)
     * @param {string|string[]} [options.attributes] - Attributes to search in (title, description, content)
     * @param {number} [options.page] - Page number for pagination
     * @param {string} [options.sortby] - Sort by 'publishedAt' or 'relevance'
     * @param {string|string[]} [options.publisher] - Publisher(s) to filter by
     * @param {string} [options.format] - Response format (json, csv, xlsx)
     * 
     * @see https://allnewsapi.com/docs for the complete API documentation.
     * @returns {Promise<Object>} - Search results
     */
    async search(options = {}) {
      // Format date objects to ISO strings if provided
      if (options.startDate instanceof Date) {
        options.startDate = options.startDate.toISOString();
      }
      
      if (options.endDate instanceof Date) {
        options.endDate = options.endDate.toISOString();
      }
      
      return this._makeRequest(options);
    }

    /**
     * Get headlines
     * @param {Object} options - Headlines options (same as search options)
     * @param {string} [options.q] - Keywords to search for
     * @param {string|Date} [options.startDate] - Start date (YYYY-MM-DD or Date object)
     * @param {string|Date} [options.endDate] - End date (YYYY-MM-DD or Date object)
     * @param {boolean} [options.content] - Whether to include full content
     * @param {string|string[]} [options.lang] - Language(s) to filter by
     * @param {string|string[]} [options.country] - Country/countries to filter by
     * @param {string|string[]} [options.region] - Region(s) to filter by
     * @param {string|string[]} [options.category] - Category/categories to filter by
     * @param {number} [options.max] - Maximum number of results (1-100)
     * @param {string|string[]} [options.attributes] - Attributes to search in (title, description, content)
     * @param {number} [options.page] - Page number for pagination
     * @param {string} [options.sortby] - Sort by 'publishedAt' or 'relevance'
     * @param {string|string[]} [options.publisher] - Publisher(s) to filter by
     * @param {string} [options.format] - Response format (json, csv, xlsx)
     *
     * @see https://allnewsapi.com/docs for the complete API documentation.
     * @returns {Promise<Object>} - Headlines results
     */
    async headlines(options = {}) {
      // Format date objects to ISO strings if provided
      if (options.startDate instanceof Date) {
        options.startDate = options.startDate.toISOString();
      }
      
      if (options.endDate instanceof Date) {
        options.endDate = options.endDate.toISOString();
      }
      
      return this._makeRequest(options, this.headlinesEndpoint);
    }
  }
  
  /**
   * Custom error class for NewsAPI errors
   */
  class NewsAPIError extends Error {
    /**
     * Create a new NewsAPIError
     * @param {number} statusCode - HTTP status code
     * @param {string} message - Error message
     */
    constructor(statusCode, message) {
      super(message);
      this.name = "AllNewsAPIError";
      this.statusCode = statusCode;
    }
  }
  
  // Export the NewsAPI class
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { NewsAPI, NewsAPIError };
  } else if (typeof window !== "undefined") {
    window.NewsAPI = NewsAPI;
    window.NewsAPIError = NewsAPIError;
  }