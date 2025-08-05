

# 🏛️ Court Tracker

Court Tracker is an AI-powered web application designed to **scrape, extract, and visualize** legal case metadata . It replicates form-based queries, bypasses CAPTCHA, parses judgments (PDFs), and presents structured insights in a responsive dashboard.

---

## 📦 Project Structure

| Folder / File         | Purpose |
|------------------------|---------|
| `src/`                | App logic including scraper, PDF parser, and API routes |
| `docs/`               | Documentation for workflow and modules |
| `.idx`                | Indexing metadata for optimized search |
| `components.json`     | Dynamic component registry for UI modules |
| `README.md`           | Project guide and usage instructions |
| `tailwind.config.ts`  | Styling configuration for dashboard |
| `tsconfig.json`       | TypeScript compiler settings |
| `next.config.ts`      | Next.js configuration for SSR |
| `package.json`        | Dependencies and scripts |
| `postcss.config.mjs`  | PostCSS setup for advanced styling |
| `.gitignore`          | Ignored files for Git workflow |
| `apphosting.yaml`     | Cloud deployment configuration |

--


# Install dependencies
npm install

# Start dev server
npm run dev

# Run backend server (FastAPI)
uvicorn src.main:app --reload

## 📄 License

MIT — Free to use and modify. Respect Indian Judiciary guidelines for data usage.

---

```

Ready for a deployment guide or want help writing a CONTRIBUTING.md or dataset builder? I’ll roll that next brother ⚒️
