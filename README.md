<div align="center">

<br/>

```
 ██████╗ ██████╗ ██████╗ ███████╗███████╗ ██████╗ █████╗ ███╗   ██╗     █████╗ ██╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗████╗  ██║    ██╔══██╗██║
██║     ██║   ██║██║  ██║█████╗  ███████╗██║     ███████║██╔██╗ ██║    ███████║██║
██║     ██║   ██║██║  ██║██╔══╝  ╚════██║██║     ██╔══██║██║╚██╗██║    ██╔══██║██║
╚██████╗╚██████╔╝██████╔╝███████╗███████║╚██████╗██║  ██║██║ ╚████║    ██║  ██║██║
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝╚═╝
```

### AI-Powered Code Review in Your Browser

**Detect bugs. Flag security risks. Boost performance. Refactor smarter.**

<br/>

![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite&logoColor=white)
![OpenRouter](https://img.shields.io/badge/OpenRouter-GPT--4o-10a37f?style=for-the-badge&logo=openai&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-22c55e?style=for-the-badge)

<br/>

</div>

---

## What is CodeScan AI?

**CodeScan AI** is a zero-install, browser-based code review tool that uses GPT-4o (via OpenRouter) to analyze your code across four dimensions simultaneously:

| Dimension | What it catches |
|-----------|----------------|
| **Bugs** | Division by zero, null references, logic errors, edge cases |
| **Security** | SQL injection, hardcoded secrets, unsafe file handling, weak auth |
| **Performance** | O(n²) loops, redundant iterations, inefficient data structures |
| **Code Quality** | Missing type hints, poor naming, refactoring opportunities |

Paste your code or upload a file, hit **Analyze**, and get a structured report with a quality score, severity-tagged issues, fix suggestions, and corrected code snippets — all in under 10 seconds.

---

## Features

- **Syntax-highlighted editor** — custom-built with live highlighting for 13 languages, no heavy Monaco dependency
- **Animated background** — canvas-rendered node network, glowing orbs, falling code fragments, and scanline sweep
- **Structured AI report** — JSON-parsed response with score (0–100), breakdown bars, and per-issue cards
- **Expandable issue cards** — click any issue to reveal the full description, fix suggestion, and corrected code
- **File upload** — drag or select `.py`, `.js`, `.ts`, `.java`, `.cpp`, `.go`, `.rs`, and more
- **13 language selector** — Python, JavaScript, TypeScript, Java, C, C++, Go, Rust, PHP, Ruby, Swift, Kotlin, C#
- **Pure SVG iconography** — no emoji, no icon library, every icon is an inline SVG
- **`.env` key management** — API key never touches the UI, read directly from Vite's environment
- **Graceful degradation** — clear error states if the key is missing or the request fails

---

## Preview

```
┌─────────────────────────────┬──────────────────────────────────────┐
│  Language ▾  Upload  Sample │  Overview  Bugs(2)  Security(1)  ... │
├─────────────────────────────┼──────────────────────────────────────┤
│                             │                                      │
│  import sqlite3             │   ◉  Score: 54/100                  │
│                             │                                      │
│  API_KEY = "sk-prod-..."    │   Readability   ████████░░  80       │
│                             │   Performance   █████░░░░░  52       │
│  def get_user(username):    │   Security      ██░░░░░░░░  18       │
│      query = "SELECT * ...  │   Best Practice ██████░░░░  63       │
│                             │                                      │
│  def find_duplicates(arr):  │  ─────────────────────────────────  │
│      for i in range(...):   │  ⚠  Hardcoded API Key   CRITICAL    │
│          for j in range(... │  ⚠  SQL Injection Risk  CRITICAL    │
│                             │  ◎  O(n²) Loop Detected  HIGH       │
└─────────────────────────────┴──────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5 |
| Styling | Inline styles + CSS-in-JS (no Tailwind, no CSS modules) |
| Background | HTML5 Canvas API (custom renderer) |
| Icons | Inline SVG (zero dependencies) |
| AI Model | GPT-4o via [OpenRouter](https://openrouter.ai) |
| API Layer | `fetch()` — direct from browser, no backend |
| Font | JetBrains Mono + Space Grotesk (Google Fonts) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- An [OpenRouter](https://openrouter.ai/keys) API key (free tier available)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/iAdityaSharma2912/codescan-ai.git
cd codescan-ai

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

### Configure API Key

Open the `.env` file and paste your OpenRouter key:

```env
VITE_OPENROUTER_API_KEY=sk-or-v1-your-real-key-here
```

> Get your free key at [openrouter.ai/keys](https://openrouter.ai/keys). The free tier includes GPT-4o access.

### Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start reviewing code.

---

## Project Structure

```
codescan-ai/
│
├── src/
│   └── App.jsx           # Entire application — components, logic, styles
│
├── public/
│   └── vite.svg
│
├── .env                  # Your API key (never commit this)
├── .env.example          # Template — safe to commit
├── .gitignore            # Includes .env
├── index.html
├── package.json
└── README.md
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_OPENROUTER_API_KEY` | Yes | Your OpenRouter API key. Must start with `sk-or-` |

> **Important:** Vite only exposes variables prefixed with `VITE_` to the frontend bundle. Never remove this prefix.

---

## How It Works

```
User pastes/uploads code
         │
         ▼
Language is selected (auto-detected from file extension on upload)
         │
         ▼
Prompt is constructed with language context + code
         │
         ▼
POST → openrouter.ai/api/v1/chat/completions (GPT-4o)
         │
         ▼
JSON response is parsed into: score, scores{}, bugs[], security[], performance[], refactoring[]
         │
         ▼
Results rendered in tabbed dashboard with expandable issue cards
```

### AI Prompt Strategy

The model is given a strict instruction to return **raw JSON only** — no markdown fences, no preamble. The response schema is fully specified in the prompt, ensuring consistent structure across all languages and code patterns.

---

## Supported Languages

| Language | Extension |
|----------|-----------|
| Python | `.py` |
| JavaScript | `.js` |
| TypeScript | `.ts` |
| Java | `.java` |
| C++ | `.cpp` |
| C | `.c` |
| Go | `.go` |
| Rust | `.rs` |
| PHP | `.php` |
| Ruby | `.rb` |
| Swift | `.swift` |
| Kotlin | `.kt` |
| C# | `.cs` |

---

## Security Notes

- The API key is read **only** from `import.meta.env` — it is never stored in state, localStorage, or sent anywhere except the OpenRouter API
- `.env` is excluded from git via `.gitignore`
- For production deployments, route requests through a backend proxy to fully hide the key from the client bundle

### Recommended Production Architecture

```
React Frontend
      │
      │  POST /api/review
      ▼
Node.js / Express Backend     ← API key lives here only
      │
      │  POST openrouter.ai/api/v1/...
      ▼
OpenRouter → GPT-4o
```

---

## Sample Output

Given this Python code:

```python
API_KEY = "sk-prod-abc123secret"

def get_user(username):
    query = "SELECT * FROM users WHERE name = '" + username + "'"
    conn.execute(query)
```

CodeScan AI returns:

```json
{
  "score": 22,
  "scores": { "readability": 55, "performance": 60, "security": 4, "best_practices": 30 },
  "summary": "Critical security vulnerabilities detected...",
  "security": [
    {
      "title": "Hardcoded API Key",
      "severity": "critical",
      "line": 1,
      "description": "A secret key is hardcoded directly in source code...",
      "suggestion": "Move to environment variables using os.getenv()",
      "code_fix": "API_KEY = os.getenv('API_KEY')"
    },
    {
      "title": "SQL Injection Vulnerability",
      "severity": "critical",
      "line": 4,
      "description": "String concatenation in SQL queries allows injection attacks...",
      "suggestion": "Use parameterized queries",
      "code_fix": "query = 'SELECT * FROM users WHERE name = ?'\nconn.execute(query, (username,))"
    }
  ]
}
```

---

## Roadmap

- [ ] GitHub repo URL analyzer — paste a link, review the whole project
- [ ] Copy-to-clipboard for code fix snippets
- [ ] Dark/light theme toggle
- [ ] Export report as PDF
- [ ] Backend proxy mode for production safety
- [ ] Support for more models (Claude 3.5, Gemini 1.5 Pro)
- [ ] PR review bot — GitHub Actions integration

---

## Contributing

Pull requests are welcome. For major changes, open an issue first.

```bash
# Fork → clone → branch
git checkout -b feature/your-feature-name

# Make changes, then
git commit -m "feat: describe your change"
git push origin feature/your-feature-name
# Open a PR
```

---

## License

MIT — use it, ship it, build on it.

---

<div align="center">

Built by [Aditya Sharma](https://github.com/iAdityaSharma2912) · [@iaddy29](https://twitter.com/iaddy29)

*If this helped you, a ⭐ on GitHub goes a long way.*

</div>
