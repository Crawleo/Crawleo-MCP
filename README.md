# Crawleo MCP Server

<a href="https://glama.ai/mcp/servers/@crawleo/crawleo-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@crawleo/crawleo-mcp/badge" alt="Crawleo MCP server" />
</a>


[![smithery badge](https://smithery.ai/badge/crawleo/crawleo)](https://smithery.ai/server/crawleo/crawleo)

Real-time web search and crawling capabilities for AI assistants through Model Context Protocol (MCP).

## Overview

Crawleo MCP enables AI assistants to access live web data through two powerful tools:
- **web.search** - Real-time web search with multiple output formats
- **web.crawl** - Deep content extraction from any URL

## Features

✅ **Real-time web search** from any country/language  
✅ **Multiple output formats** - Enhanced HTML, Raw HTML, Markdown, Plain Text  
✅ **Device-specific results** - Desktop, mobile, or tablet view  
✅ **Deep content extraction** with JavaScript rendering  
✅ **Zero data retention** - Complete privacy  
✅ **Auto-crawling** option for search results  

---

## Installation

### Option 1: NPM (Recommended for local usage)

Install globally via npm:

```bash
npm install -g crawleo-mcp
```

Or use npx without installing:

```bash
npx crawleo-mcp
```

### Option 2: Clone Repository

```bash
git clone https://github.com/Crawleo/Crawleo-MCP.git
cd Crawleo-MCP
npm install
npm run build
```

### Option 3: Docker

Build and run using Docker:

```bash
# Build the image
docker build -t crawleo-mcp .

# Run with your API key
docker run -e CRAWLEO_API_KEY=your_api_key crawleo-mcp
```

**Docker configuration for MCP clients:**

```json
{
  "mcpServers": {
    "crawleo": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "CRAWLEO_API_KEY=YOUR_API_KEY_HERE", "crawleo-mcp"]
    }
  }
}
```

### Option 4: Remote Server (No installation needed)

Use the hosted version at `https://api.crawleo.dev/mcp` - see configuration examples below.

---

## Getting Your API Key

1. Visit [crawleo.dev](https://crawleo.dev)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key (starts with `sk_`)

---

## Setup Instructions

### Using Local MCP Server (npm package)

After installing via npm, configure your MCP client to use the local server:

**Claude Desktop / Cursor / Windsurf (Local):**

```json
{
  "mcpServers": {
    "crawleo": {
      "command": "npx",
      "args": ["crawleo-mcp"],
      "env": {
        "CRAWLEO_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

**Or if installed globally:**

```json
{
  "mcpServers": {
    "crawleo": {
      "command": "crawleo-mcp",
      "env": {
        "CRAWLEO_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

**From cloned repository:**

```json
{
  "mcpServers": {
    "crawleo": {
      "command": "node",
      "args": ["/path/to/Crawleo-MCP/dist/index.js"],
      "env": {
        "CRAWLEO_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

---

### Using Remote Server (Hosted)

#### 1. Claude Desktop

**Location of config file:**

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Configuration:**

```json
{
  "mcpServers": {
    "crawleo": {
      "url": "https://api.crawleo.dev/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      }
    }
  }
}
```

Replace `YOUR_API_KEY_HERE` with your actual API key from crawleo.dev.

**Steps:**
1. Open the config file in a text editor
2. Add the Crawleo MCP configuration
3. Save the file
4. Restart Claude Desktop completely (quit and reopen)
5. Start a new conversation and ask Claude to search the web!

**Example usage:**
```
"Search for the latest AI news and summarize the top 5 articles"
"Find Python web scraping tutorials and extract code examples"
```

---

### 2. Cursor IDE

**Location of config file:**

- **macOS**: `~/.cursor/config.json` or `~/Library/Application Support/Cursor/config.json`
- **Windows**: `%APPDATA%\Cursor\config.json`
- **Linux**: `~/.config/Cursor/config.json`

**Configuration:**

```json
{
  "mcpServers": {
    "crawleo": {
      "url": "https://api.crawleo.dev/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      }
    }
  }
}
```

**Steps:**
1. Locate and open your Cursor config file
2. Add the Crawleo MCP configuration
3. Save the file
4. Restart Cursor
5. The MCP tools will be available in your AI assistant

**Example usage in Cursor:**
```
"Search for React best practices and add them to my code comments"
"Find the latest documentation for this API endpoint"
```

---

### 3. Windsurf IDE

**Location of config file:**

- **macOS**: `~/Library/Application Support/Windsurf/config.json`
- **Windows**: `%APPDATA%\Windsurf\config.json`
- **Linux**: `~/.config/Windsurf/config.json`

**Configuration:**

```json
{
  "mcpServers": {
    "crawleo": {
      "url": "https://api.crawleo.dev/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      }
    }
  }
}
```

**Steps:**
1. Open the Windsurf config file
2. Add the Crawleo MCP server configuration
3. Save and restart Windsurf
4. Start using web search in your coding workflow

---

### 4. GitHub Copilot

**Location of config file:**

For GitHub Copilot in VS Code or compatible editors, you need to configure MCP servers.

**Configuration:**

Create or edit your MCP config file and add:

```json
{
  "servers": {
    "Crawleo": {
      "url": "https://api.crawleo.dev/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      }
    }
  }
}
```

**Complete example with multiple servers:**

```json
{
  "servers": {
    "Crawleo": {
      "url": "https://api.crawleo.dev/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      }
    }
  }
}
```

**Steps:**
1. Open your GitHub Copilot MCP configuration
2. Add the Crawleo server configuration
3. Save the file
4. Restart VS Code or your IDE
5. GitHub Copilot can now use Crawleo for web searches!

**Example usage:**
```
Ask Copilot: "Search for the latest Python best practices"
Ask Copilot: "Find documentation for this library"
```

---

### 5. OpenAI Platform (Direct Integration)

OpenAI now supports MCP servers directly! Here's how to use Crawleo with OpenAI's API:

**Python Example:**

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-4",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "search for latest news about openai models"
                }
            ]
        }
    ],
    text={
        "format": {
            "type": "text"
        },
        "verbosity": "medium"
    },
    reasoning={
        "effort": "medium"
    },
    tools=[
        {
            "type": "mcp",
            "server_label": "Crawleo",
            "server_url": "https://api.crawleo.dev/mcp",
            "server_description": "Crawleo MCP Server - Real-Time Web Knowledge for AI",
            "authorization": "YOUR_API_KEY_HERE",
            "allowed_tools": [
                "web.search",
                "web.crawl"
            ],
            "require_approval": "always"
        }
    ],
    store=True,
    include=[
        "reasoning.encrypted_content",
        "web_search_call.action.sources"
    ]
)

print(response)
```

**Key Parameters:**
- `server_url` - Crawleo MCP endpoint
- `authorization` - Your Crawleo API key
- `allowed_tools` - Enable `web.search` and/or `web.crawl`
- `require_approval` - Set to "always", "never", or "conditional"

**Node.js Example:**

```javascript
import OpenAI from 'openai';

const client = new OpenAI();

const response = await client.responses.create({
  model: 'gpt-4',
  input: [
    {
      role: 'user',
      content: [
        {
          type: 'input_text',
          text: 'search for latest AI developments'
        }
      ]
    }
  ],
  tools: [
    {
      type: 'mcp',
      server_label: 'Crawleo',
      server_url: 'https://api.crawleo.dev/mcp',
      server_description: 'Crawleo MCP Server - Real-Time Web Knowledge for AI',
      authorization: 'YOUR_API_KEY_HERE',
      allowed_tools: ['web.search', 'web.crawl'],
      require_approval: 'always'
    }
  ]
});

console.log(response);
```

---

## Available Tools

### web.search

Search the web in real-time with customizable parameters.

**Parameters:**
- `query` *(required)* - Search term
- `max_pages` - Number of result pages (default: 1)
- `setLang` - Language code (e.g., "en", "ar")
- `cc` - Country code (e.g., "US", "EG")
- `device` - Device type: "desktop", "mobile", "tablet" (default: "desktop")
- `enhanced_html` - Get clean HTML (default: true)
- `raw_html` - Get raw HTML (default: false)
- `markdown` - Get Markdown format (default: true)
- `page_text` - Get plain text (default: false)
- `auto_crawling` - Auto-crawl result URLs (default: false)

**Example:**
```
Ask your AI: "Search for 'Python web scraping' and return results in Markdown"
```

---

### web.crawl

Extract content from specific URLs.

**Parameters:**
- `urls` *(required)* - List of URLs to crawl
- `rawHtml` - Return raw HTML (default: false)
- `markdown` - Convert to Markdown (default: false)
- `screenshot` - Capture screenshot (optional)
- `country` - Geographic location

**Example:**
```
Ask your AI: "Crawl https://example.com and extract the main content in Markdown"
```

---

## Troubleshooting

### MCP server not appearing

1. **Check config file location** - Make sure you're editing the correct file
2. **Verify JSON syntax** - Use a JSON validator to check for syntax errors
3. **Restart the application** - Completely quit and reopen (not just reload)
4. **Check API key** - Ensure your API key is valid and active at crawleo.dev

### Authentication errors

- Verify your API key is correct (should start with `sk_`)
- Make sure the key is wrapped in quotes
- Check that "Bearer " prefix is included in the Authorization header (for Claude/Cursor/Windsurf)
- For OpenAI Platform, use the key directly in the `authorization` field
- Confirm your account has available credits at crawleo.dev

### No results returned

- Check your internet connection
- Verify the search query is not empty
- Try a simpler search query first
- Check API status at crawleo.dev

### Tool names not recognized

Make sure you're using the correct tool names:
- Use `web.search` (not `search_web`)
- Use `web.crawl` (not `crawl_web`)

---

## Usage Examples

### Research Assistant
```
"Search for recent developments in quantum computing and summarize the key findings"
```

### Content Analysis
```
"Search for competitor pricing pages and extract their pricing tiers"
```

### Code Documentation
```
"Find the official documentation for FastAPI and extract the quickstart guide"
```

### News Monitoring
```
"Search for today's news about artificial intelligence from US sources"
```

### Market Research
```
"Search for customer reviews of iPhone 15 and analyze sentiment"
```

---

## Pricing

Crawleo MCP uses the same affordable pricing as our API:
- **10,000 searches** → $20
- **100,000 searches** → $100
- **250,000 searches** → $200

Check your usage and manage your subscription at [crawleo.dev](https://crawleo.dev)

---

## Privacy & Security

✅ **Zero data retention** - We never store your search queries or results  
✅ **Secure authentication** - API keys transmitted over HTTPS  
✅ **No tracking** - Your usage patterns remain private  

---

## Support

- **Documentation**: [crawleo.dev/docs](https://crawleo.dev/docs)
- **API Status**: [crawleo.dev/status](https://crawleo.dev/status)
- **Contact**: support@crawleo.dev

---

## Links

- 🌐 Website: [crawleo.dev](https://crawleo.dev)
- 📚 Documentation: [crawleo.dev/docs](https://crawleo.dev/docs)
- 🔑 Get API Key: [crawleo.dev](https://crawleo.dev)




---

Is this better? Would you like me to add anything else or create additional guides?
