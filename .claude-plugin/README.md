# 🐝 Vibe Agents Marketplace

**Complete Swarm Intelligence System for Claude Code**

Official marketplace for Vibe Agents Plugin - система роевого интеллекта из 17 агентов-пчелок для автономной разработки в Claude Code.

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

- **vibe-lead** 👑 - Swarm coordination
- **vibe-spec** 📋 - Specifications
- **vibe-tester** 🧪 - TDD testing
- **vibe-critic** 🎭 - Code review
- **vibe-coder** 💻 - Development
- **vibe-typescript** 📘 - TypeScript expert
- **vibe-tasker** ✅ - Task management
- **vibe-security** 🔐 - Security audit
- **vibe-cicd** 🔄 - CI/CD pipeline
- **vibe-devops** 🚀 - DevOps & infrastructure
- **vibe-roi** 💰 - ROI analytics
- **vibe-elizaos** ⚡ - ElizaOS Framework
- **vibe-ai-llm** 🤖 - AI/LLM providers
- **vibe-mcp** 🔌 - Model Context Protocol
- **vibe-sentry** 📡 - Monitoring & observability
- **vibe-langfuse** 📊 - LLM observability
- **vibe-updater** 🔄 - Updates & migrations

### 🎣 17 Auto-Activated Skills

Skills activate automatically by keywords:
- "elizaos", "plugin" → elizaos-framework
- "ai", "llm" → ai-llm-providers
- "sentry", "ошибки" → sentry-monitoring

### ⚡ Command /task

Main command to launch the agent system:
```
/task Create authorization system
→ Automatically runs: spec → tester → coder → typescript → critic → sentry
→ Ready result in 5-10 minutes!
```

---

## 🎯 Usage

### Call Agents by Name
```typescript
Task(
  subagent_type="vibe-elizaos",
  description="Create ElizaOS plugin",
  prompt="Create new plugin with action and provider..."
)
```

### Automatic Skill Activation
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
**vibe-lead** coordinates all other agents:

```
👑 Vibe Lead (Queen Bee)
    ↓
📋 Spec → ✅ Tasker → 🧪 Tester → 💻 Coder → 📘 TypeScript → 🔍 Critic → 👑 Lead
```

### Autonomy
Agents work **until successful completion**:
- ✅ Agents DON'T exit until all tests are green
- ✅ Automatic error fixing
- ✅ Retry on failures
- ✅ Full autonomy without human involvement

---

## 💡 Examples

### Create ElizaOS Plugin
```
/task Create plugin for database integration
→ Automatically:
  - Creates specification (vibe-spec)
  - Writes tests (vibe-tester)
  - Implements code (vibe-coder)
  - Checks types (vibe-typescript)
  - Reviews code (vibe-critic)
→ Ready plugin in 5 minutes!
```

### Setup Monitoring
```
"Setup Sentry for error tracking"
→ Automatically activates sentry-monitoring
→ Sets up full monitoring
→ Creates dashboards and alerts
```

### CI/CD Pipeline
```
"Setup GitLab CI/CD with tests and deploy"
→ Automatically activates vibe-cicd
→ Creates .gitlab-ci.yml
→ Sets up automated testing
→ Adds production deployment
```

---

## 📚 Documentation

- **[README.md](plugins/vibe-agents/README.md)** - Full system description
- **[QUICK_START.md](plugins/vibe-agents/QUICK_START.md)** - Quick start guide
- **[SPECIFICATIONS.md](plugins/vibe-agents/SPECIFICATIONS.md)** - Development standards
- **[ARBITRATION.md](plugins/vibe-agents/ARBITRATION.md)** - Arbitration logic

---

## 📖 Features

- ✅ **17 Agents** - solve any tasks
- ✅ **17 Skills** - automatic activation
- ✅ **Full Autonomy** - work until completion
- ✅ **Russian Localization** - convenient for CIS
- ✅ **Simple Installation** - one command
- ✅ **TDD** - tests first approach
- ✅ **Functional Programming** - TaskEither, pipe/compose
- ✅ **TypeScript** - strict typing

---

## 🔧 Management

### List Marketplaces
```bash
/plugin marketplace list
```

### Update Metadata
```bash
/plugin marketplace update vibe-agents-marketplace
```

### Remove Marketplace
```bash
/plugin marketplace remove vibe-agents-marketplace
```

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
