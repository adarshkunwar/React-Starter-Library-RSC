# @adarsh.kunwar/rsc

A fast, lightweight CLI tool for scaffolding React projects with zero hassle.

---

## Why RSC?

RSC was created to solve a common developer pain point: repetitive project setup. Instead of recreating the same project structure and configuration files over and over, RSC automates the boilerplate so you can focus on building the features that matter.

---

## Quick Start

### Installation

Install globally via npm:

```bash
npm install -g @adarsh.kunwar/rsc
```

Or run instantly with npx (no installation required):

```bash
npx @adarsh.kunwar/rsc init
```

---

## Usage

### Create a New Project

```bash
rsc init
```

Follow the interactive prompts to complete your project setup.

### Available Templates

**Note:** Currently, only one template is available, but more are on the way!

*More templates coming soon!*

---

## Development

### Local Setup

Clone the repository and run locally:

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

We welcome contributions! Here's how you can help:

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

- [ ] Complete the starter process (project initialization)
- [ ] Complete the midway process (adding features to existing projects)
- [ ] Support for multiple templates
- [ ] UI component library integration options
- [ ] Project update and migration commands

---

## License

MIT © [Adarsh Kunwar](https://github.com/adarshkunwar)

---

## Links

- **GitHub Repository**: [React-Starter-Library-RSC](https://github.com/adarshkunwar/React-Starter-Library-RSC)
- **npm Package**: [@adarsh.kunwar/rsc](https://www.npmjs.com/package/@adarsh.kunwar/rsc)