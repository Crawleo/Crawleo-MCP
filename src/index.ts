#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_BASE_URL = "https://api.crawleo.dev/api/v1";

// Get API key from environment variable
const getApiKey = (): string => {
  const apiKey = process.env.CRAWLEO_API_KEY;
  if (!apiKey) {
    console.error("Error: CRAWLEO_API_KEY environment variable is required");
    console.error("Get your API key at https://crawleo.dev");
    process.exit(1);
  }
  return apiKey;
};

// Web Search Schema - matches Crawleo REST API
const WebSearchSchema = z.object({
  query: z.string().describe("Search query term. The main keyword or phrase to search for."),
  max_pages: z.number().optional().default(1).describe("Max result pages to crawl. Each page costs 1 credit. Min: 1"),
  setLang: z.string().optional().default("en").describe("Language code for search interface (e.g., 'en', 'es', 'fr', 'ar')"),
  cc: z.string().optional().describe("Country code for search results (e.g., 'US', 'GB', 'DE', 'EG')"),
  geolocation: z.enum(["random", "pl", "gb", "jp", "de", "fr", "es", "us"]).optional().default("random").describe("Geo location for search"),
  device: z.enum(["desktop", "mobile", "tablet"]).optional().default("desktop").describe("Device simulation"),
  enhanced_html: z.boolean().optional().default(true).describe("Return AI-enhanced, cleaned HTML optimized for processing"),
  raw_html: z.boolean().optional().default(false).describe("Return original, unprocessed HTML of the page"),
  page_text: z.boolean().optional().default(false).describe("Return extracted plain text without HTML tags"),
  markdown: z.boolean().optional().default(true).describe("Return content in Markdown format for easy parsing"),
});

// Web Crawl Schema
const WebCrawlSchema = z.object({
  url: z.string().describe("URL to crawl and extract content from"),
  markdown: z.boolean().optional().default(true).describe("Return content in Markdown format"),
  raw_html: z.boolean().optional().default(false).describe("Return original, unprocessed HTML"),
  enhanced_html: z.boolean().optional().default(true).describe("Return AI-enhanced, cleaned HTML"),
});

// API GET request helper for search
async function makeSearchRequest<T>(
  params: Record<string, unknown>
): Promise<T> {
  const apiKey = getApiKey();
  
  // Build query string from params
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  }
  
  const url = `${API_BASE_URL}/search?${queryParams.toString()}`;
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${response.status} - ${errorText}`);
  }

  return response.json() as Promise<T>;
}

// API POST request helper for crawl
async function makeCrawlRequest<T>(
  body: Record<string, unknown>
): Promise<T> {
  const apiKey = getApiKey();
  
  const response = await fetch(`${API_BASE_URL}/crawl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${response.status} - ${errorText}`);
  }

  return response.json() as Promise<T>;
}

// Create MCP Server
const server = new McpServer({
  name: "crawleo-mcp",
  version: "1.0.0",
});

// Register search_web tool (matches Crawleo MCP naming)
server.tool(
  "search_web",
  "Search the web using Crawleo's AI-powered search engine. Returns results with optional AI-enhanced HTML, markdown content, and structured data.",
  WebSearchSchema.shape,
  async (args) => {
    try {
      const result = await makeSearchRequest<Record<string, unknown>>({
        query: args.query,
        max_pages: args.max_pages,
        setLang: args.setLang,
        cc: args.cc,
        geolocation: args.geolocation,
        device: args.device,
        enhanced_html: args.enhanced_html,
        raw_html: args.raw_html,
        page_text: args.page_text,
        markdown: args.markdown,
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return {
        content: [
          {
            type: "text" as const,
            text: `Error performing search: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Register crawl_web tool (matches Crawleo MCP naming)
server.tool(
  "crawl_web",
  "Crawl a specific webpage and extract its content in various formats including Markdown, raw HTML, and AI-enhanced HTML.",
  WebCrawlSchema.shape,
  async (args) => {
    try {
      const result = await makeCrawlRequest<Record<string, unknown>>({
        url: args.url,
        markdown: args.markdown,
        raw_html: args.raw_html,
        enhanced_html: args.enhanced_html,
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return {
        content: [
          {
            type: "text" as const,
            text: `Error crawling URL: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Crawleo MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
