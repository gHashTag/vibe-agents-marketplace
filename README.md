# 🐝 Vibe Agents Marketplace

**Complete Swarm Intelligence System for Claude Code**

Official marketplace for Vibe Agents Plugin - система роевого интеллекта из 17 агентов-пчелок для автономной разработки в Claude Code.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Compatible-green.svg)](https://claude.ai/code)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)]()

## 🚀 Quick Start

### 1. Add Marketplace
```bash
/plugin marketplace add gHashTag/vibe-agents-marketplace
```

### 2. Install Plugin
```bash
/plugin install vibe-agents@vibe-agents-marketplace
```

### 3. Ready!
Claude Code will automatically discover:
- ✅ 17 agents in `.claude/agents/`
- ✅ 17 skills in `.claude/skills/`
- ✅ `/task` command in `.claude/commands/`

---

## 📦 What's Included

### 🤖 17 Specialized Agents (Sub-Agents)

| Agent | Description |
|-------|-------------|
| **vibe-lead** 👑 | Swarm coordination and task distribution |
| **vibe-spec** 📋 | Creating detailed specifications |
| **vibe-tester** 🧪 | TDD testing and test writing |
| **vibe-critic** 🎭 | Code review and validation |
| **vibe-coder** 💻 | Development and implementation |
| **vibe-typescript** 📘 | TypeScript expertise |
| **vibe-tasker** ✅ | Task management and planning |
| **vibe-security** 🔐 | Security audit and vulnerability scanning |
| **vibe-cicd** 🔄 | CI/CD pipeline configuration |
| **vibe-devops** 🚀 | DevOps and infrastructure |
| **vibe-roi** 💰 | ROI analytics and cost analysis |
| **vibe-elizaos** ⚡ | ElizaOS Framework expert |
| **vibe-ai-llm** 🤖 | AI/LLM providers integration |
| **vibe-mcp** 🔌 | Model Context Protocol |
| **vibe-sentry** 📡 | Monitoring and observability |
| **vibe-langfuse** 📊 | LLM observability and tracing |
| **vibe-updater** 🔄 | Updates and migrations |

### 🎣 17 Auto-Activated Skills

Skills activate automatically by keywords in your messages:

| Skill | Keywords |
|-------|----------|
| `elizaos-framework` | "elizaos", "plugin", "action" |
| `ai-llm-providers` | "ai", "llm", "openrouter" |
| `sentry-monitoring` | "sentry", "ошибки", "мониторинг" |
| `vibe-lead` | "координировать", "управлять проектом" |
| `vibe-spec` | "создать спецификацию", "техническое задание" |
| `vibe-tester` | "написать тесты", "tdd", "покрытие" |
| `vibe-critic` | "проверить код", "ревью", "валидировать" |
| ... | and more! |

### ⚡ Command /task

Main command to launch the entire agent system:

```bash
/task Create JWT authorization system
→ Automatically runs: spec → tester → coder → typescript → critic → sentry
→ Ready result in 5-10 minutes!
```

---

## 🎯 Usage Examples

### Call Agents by Name
```typescript
Task(
  subagent_type="vibe-elizaos",
  description="Create ElizaOS plugin",
  prompt="Create new plugin with action and provider..."
)
```

### Automatic Skill Activation
Just write naturally:
```
"Create ElizaOS plugin"
→ Automatically activates vibe-elizaos

"Analyze code for vulnerabilities"
→ Automatically activates vibe-security

"Setup CI/CD pipeline"
→ Automatically activates vibe-cicd
```

### Use /task Command
```
/task Develop JWT authorization system
→ Automatically:
  1. vibe-spec creates specification
  2. vibe-tester writes tests
  3. vibe-coder implements code
  4. vibe-typescript checks types
  5. vibe-critic reviews code
  6. vibe-sentry sets up monitoring
→ Ready result!
```

---

## 🐝 Architecture

### Queen Bee Pattern
**vibe-lead** coordinates all other agents in a swarm intelligence pattern:

```
👑 Vibe Lead (Queen Bee)
    ↓
📋 Spec → ✅ Tasker → 🧪 Tester → 💻 Coder → 📘 TypeScript → 🔍 Critic → 👑 Lead
```

### Autonomy
Agents work **until successful completion**:
- ✅ Agents DON'T exit until all tests are green
- ✅ Automatic error fixing and retries
- ✅ Full autonomy without human intervention
- ✅ Cross-agent knowledge sharing

---

## 💡 Advanced Features

### 🧪 TDD (Test-Driven Development)
Full TDD cycle integration:
```typescript
1. vibe-spec → creates requirements
2. vibe-tester → writes red tests
3. vibe-coder → implements code
4. vibe-typescript → checks types
5. vibe-tester → verifies green tests
6. vibe-critic → refactors code
```

### ⚡ Functional Programming
- **TaskEither** for error handling
- **pipe/compose** for function composition
- **Pure functions** without side effects
- **Immutable data** structures

### 📝 Russian Localization
- ✅ All user communication in Russian
- ✅ Complete documentation in Russian
- ✅ All messages and reports in Russian

---

## 📊 Metrics

- **Agents**: 17 units (100% task coverage)
- **Skills**: 17 units (auto-activation)
- **Commands**: 1 unit (/task)
- **Documentation**: Complete
- **Languages**: TypeScript, Russian
- **Architecture**: Functional
- **Testing**: TDD

---

## 🔧 Management Commands

```bash
# List all marketplaces
/plugin marketplace list

# Update metadata
/plugin marketplace update vibe-agents-marketplace

# Remove marketplace
/plugin marketplace remove vibe-agents-marketplace
```

---

## 📚 Documentation

- **[`.claude-plugin/README.md`](.claude-plugin/README.md)** - Full system description
- **[`.claude-plugin/plugins/vibe-agents/QUICK_START.md`](.claude-plugin/plugins/vibe-agents/QUICK_START.md)** - Quick start guide
- **[`.claude-plugin/plugins/vibe-agents/SPECIFICATIONS.md`](.claude-plugin/plugins/vibe-agents/SPECIFICATIONS.md)** - Development standards
- **[`.claude-plugin/plugins/vibe-agents/ARBITRATION.md`](.claude-plugin/plugins/vibe-agents/ARBITRATION.md)** - Arbitration logic

---

## 🚀 Installation Alternatives

### Via Release Download
```bash
# Download archive
wget https://github.com/gHashTag/vibe-agents-marketplace/releases/download/v1.0.0/vibe-agents-marketplace.tar.gz

# Extract
tar -xzf vibe-agents-marketplace.tar.gz

# Add marketplace
/plugin marketplace add ./path/to/.claude-plugin

# Install plugin
/plugin install vibe-agents@local
```

### Via Direct Link
```bash
/plugin marketplace add https://github.com/gHashTag/vibe-agents-marketplace
/plugin install vibe-agents@vibe-agents-marketplace
```

---

## 🆘 Troubleshooting

### Plugin not installing
1. Check internet connection
2. Verify repository is public
3. Try manual archive download

### Agents not appearing
1. Restart Claude Code
2. Check files in `.claude/agents/`
3. Run: `/plugin marketplace update vibe-agents-marketplace`

### /task command not working
1. Check `.claude/commands/task.md` exists
2. Verify plugin installed correctly
3. Restart Claude Code

---

## 📄 License

MIT License - free for any use

---

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines.

---

## 🎉 Conclusion

**Vibe Agents Marketplace** is a ready-to-use swarm intelligence system for Claude Code.

Install now and start autonomous development!

```bash
/plugin marketplace add gHashTag/vibe-agents-marketplace
/plugin install vibe-agents@vibe-agents-marketplace
```

---

**🐝 Vibee Swarm Intelligence - Autonomous Development Without Limits! ✨**

*Created with ❤️ for the Claude Code community*
