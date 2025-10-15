# @adarsh.kunwar/rsc

A fast, lightweight CLI tool for scaffolding React projects with zero hassle.

---

## Why RSC?

Stop wasting time on boilerplate setup. RSC gets you coding in seconds with:

- ⚡ **Lightning-fast setup** – From zero to React in under 30 seconds
- 🎨 **Curated templates** – Production-ready starters, not bloated configs
- 🔧 **Zero configuration** – Smart defaults that just work
- 🎯 **Interactive CLI** – Guided setup with sensible prompts

---

## Quick Start

### Installation

Install globally via npm:
```bash
npm install -g @adarsh.kunwar/rsc
```

Or run instantly with npx (no install required):
```bash
npx @adarsh.kunwar/rsc init
```

---

## Usage

### Create a New Project
```bash
rsc init
```

Follow the interactive prompts to:
- Name your project
- Select a template (starter, with routing, with state management, etc.)
- Choose your preferred package manager
- Configure TypeScript, ESLint, and other tooling

### Example
```bash
$ rsc init

✨ Welcome to RSC - React Starter CLI

? Project name: my-awesome-app
? Select a template: React + TypeScript + Vite
? Package manager: npm
? Initialize git repository? Yes

🚀 Setting up your project...
✅ Project created successfully!

Next steps:
  cd my-awesome-app
  npm run dev

Happy coding! 🎉
```

---

## Available Templates

- **Starter** – Minimal React setup with Vite
- **TypeScript** – React + TypeScript + modern tooling
- **Router** – React Router pre-configured
- **Full Stack** – React + Node.js API structure

*More templates coming soon!*

---

## Development

### Local Setup

Clone and run locally:
```bash
git clone https://github.com/adarshkunwar/React-Starter-Library-RSC
cd React-Starter-Library-RSC
npm install
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to JavaScript in `dist/` |
| `npm run start` | Run the compiled CLI locally |
| `npm run dev` | Development mode with hot reload (using `tsx`) |
| `npm test` | Run test suite (if configured) |

### Project Structure
```
rsc/
├── src/
│   ├── commands/      # CLI commands
│   ├── templates/     # Project templates
│   ├── utils/         # Helper functions
│   └── index.ts       # Entry point
├── dist/              # Compiled output
└── package.json
```

---

## Contributing

We love contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-template`
3. **Commit your changes**: `git commit -m 'Add amazing template'`
4. **Push to the branch**: `git push origin feature/amazing-template`
5. **Open a Pull Request**

### Contribution Ideas

- 🎨 New project templates
- 🐛 Bug fixes and improvements
- 📚 Documentation enhancements
- ✨ Feature requests

---

## Roadmap

- [ ] Framework-agnostic templates (Vue, Svelte)
- [ ] Custom template support from GitHub repos
- [ ] Plugin system for extensibility
- [ ] UI component library integration options
- [ ] Project update/migration commands

---

## Support

- 📖 **Documentation**: [GitHub Wiki](https://github.com/adarshkunwar/React-Starter-Library-RSC/wiki)
- 🐛 **Issues**: [Report bugs](https://github.com/adarshkunwar/React-Starter-Library-RSC/issues)
- 💬 **Discussions**: [Join the conversation](https://github.com/adarshkunwar/React-Starter-Library-RSC/discussions)

---

## License

MIT © [Adarsh Kunwar](https://github.com/adarshkunwar)

---

<div align="center">

Made with ❤️ by developers, for developers

⭐ Star us on [GitHub](https://github.com/adarshkunwar/React-Starter-Library-RSC) if this helped you!

</div>