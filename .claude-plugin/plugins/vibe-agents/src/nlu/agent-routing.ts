/**
 * 🐝 Agent Routing
 * Route NLU results to appropriate agents
 */

import { TaskEither, left, right } from 'fp-ts/lib/TaskEither';
import { Intent, Entity, AgentRoute } from './types';

const AGENT_ROUTING_MAP: Record<string, string> = {
  'create-component': 'vibe-coder',
  'create-application': 'vibe-lead',
  'develop-api': 'vibe-coder',
  'write-tests': 'vibe-tester',
  'security-audit': 'vibe-security',
  'setup-ci': 'vibe-devops',
  'optimize-performance': 'vibe-diagnostics',
  'refactor-code': 'vibe-critic',
  'debug-issue': 'vibe-coder',
  'generate-documentation': 'vibe-knowledge-keeper'
};

const AGENT_CAPABILITIES: Record<string, string[]> = {
  'vibe-coder': ['programming', 'React', 'TypeScript', 'Node.js', 'debugging'],
  'vibe-lead': ['architecture', 'coordination', 'project-planning'],
  'vibe-tester': ['testing', 'TDD', 'Jest', 'Cypress'],
  'vibe-security': ['security', 'audit', 'vulnerability'],
  'vibe-devops': ['CI/CD', 'deployment', 'DevOps'],
  'vibe-diagnostics': ['performance', 'optimization', 'monitoring'],
  'vibe-critic': ['code-review', 'refactoring', 'quality'],
  'vibe-knowledge-keeper': ['documentation', 'knowledge-management']
};

export const routeToAgent = (
  intent: Intent,
  entities: Entity[]
): TaskEither<Error, AgentRoute> => {
  const agentId = AGENT_ROUTING_MAP[intent.name];
  
  if (!agentId) {
    return left(new Error('No agent found for intent: ' + intent.name));
  }

  return right({
    agentId,
    intent: intent.name,
    entities,
    task: generateTaskFromNLU(intent, entities),
    confidence: intent.confidence,
    originalText: ''
  });
};

export const getBestAgent = (
  intent: Intent,
  entities: Entity[],
  availableAgents: string[]
): string | null => {
  const primaryAgent = AGENT_ROUTING_MAP[intent.name];
  
  if (!primaryAgent) {
    return null;
  }
  
  if (availableAgents.includes(primaryAgent)) {
    return primaryAgent;
  }
  
  return findBestMatch(intent, availableAgents);
};

const findBestMatch = (intent: Intent, availableAgents: string[]): string | null => {
  let bestAgent: string | null = null;
  let bestScore = 0;
  
  for (const agentId of availableAgents) {
    const capabilities = AGENT_CAPABILITIES[agentId] || [];
    const score = calculateAgentScore(intent, capabilities);
    
    if (score > bestScore) {
      bestScore = score;
      bestAgent = agentId;
    }
  }
  
  return bestAgent;
};

const calculateAgentScore = (intent: Intent, capabilities: string[]): number => {
  let score = 0;
  
  if (capabilities.includes(intent.name)) {
    score += 1.0;
  }
  
  return score;
};

export const generateTaskFromNLU = (intent: Intent, entities: Entity[]): any => {
  const framework = entities.find(e => e.type === 'framework')?.value;
  const language = entities.find(e => e.type === 'language')?.value;
  const taskType = entities.find(e => e.type === 'taskType')?.value;
  
  const task: any = {
    type: intent.name,
    framework: framework || 'React',
    language: language || 'TypeScript',
    entities,
    generatedFrom: 'NLU',
    originalIntent: intent.name,
    timestamp: new Date().toISOString()
  };
  
  if (taskType) {
    task.taskType = taskType;
  }
  
  return task;
};

export const getAgentRoutingMap = (): Record<string, string> => {
  return { ...AGENT_ROUTING_MAP };
};

export const addAgentRoute = (intent: string, agentId: string) => {
  AGENT_ROUTING_MAP[intent] = agentId;
};

export const removeAgentRoute = (intent: string) => {
  delete AGENT_ROUTING_MAP[intent];
};

export const validateAgentRoute = (intent: string, agentId: string): boolean => {
  return AGENT_ROUTING_MAP[intent] === agentId;
};

export const getAgentsByCapability = (capability: string): string[] => {
  const agents: string[] = [];
  
  for (const [agentId, capabilities] of Object.entries(AGENT_CAPABILITIES)) {
    if (capabilities.includes(capability)) {
      agents.push(agentId);
    }
  }
  
  return agents;
};

export const getAgentCapabilities = (agentId: string): string[] => {
  return AGENT_CAPABILITIES[agentId] || [];
};

export const addAgentCapability = (agentId: string, capability: string) => {
  if (!AGENT_CAPABILITIES[agentId]) {
    AGENT_CAPABILITIES[agentId] = [];
  }
  
  if (!AGENT_CAPABILITIES[agentId].includes(capability)) {
    AGENT_CAPABILITIES[agentId].push(capability);
  }
};

export const removeAgentCapability = (agentId: string, capability: string) => {
  if (AGENT_CAPABILITIES[agentId]) {
    AGENT_CAPABILITIES[agentId] = AGENT_CAPABILITIES[agentId].filter(c => c !== capability);
  }
};
