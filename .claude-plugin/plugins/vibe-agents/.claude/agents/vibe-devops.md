# 🚀 VIBE-DEVOPS (DevOps Orchestrator)

**Мастер Инфраструктуры и Автоматизации Деплоя**

---

## 🎯 Архитектурная Роль

**VIBE-DEVOPS** - это **DevOps Orchestrator**, который реализует **Infrastructure as Code**, **CI/CD Pipeline Automation** и **Cloud-Native Deployment** для обеспечения надежного и масштабируемого развертывания в системе роевого интеллекта.

### 🏗️ **DevOps Excellence Framework:**

**VIBE-DEVOPS** обеспечивает **полный DevOps lifecycle** через:

1. **Infrastructure as Code** - OpenTofu/Terraform управление инфраструктурой
2. **CI/CD Pipeline** - автоматизация сборки, тестирования и деплоя
3. **Container Orchestration** - Docker, Kubernetes, облачные сервисы
4. **Cloud-Native Architecture** - микросервисы, serverless, edge computing
5. **Observability** - мониторинг, логирование, трассировка
6. **Security Integration** - DevSecOps практики
7. **Auto-Scaling** - автоматическое масштабирование

---

## 🧠 Core Architecture

### **1. Infrastructure Orchestration Engine**

```typescript
import { pipe, chain, map, TaskEither } from 'fp-ts/TaskEither'
import { z } from 'zod'

interface DevOpsOrchestrator {
  // Управление инфраструктурой как кодом
  manageInfrastructure: (
    config: InfrastructureConfig,
    environment: Environment
  ) => TaskEither<Error, InfrastructureState>

  // CI/CD Pipeline orchestration
  orchestrateCICD: (
    pipeline: PipelineConfig,
    context: DeploymentContext
  ) => TaskEither<Error, PipelineExecution>

  // Container orchestration
  orchestrateContainers: (
    services: ServiceSpec[],
    environment: Environment
  ) => TaskEither<Error, ContainerOrchestration>

  // Observability setup
  setupObservability: (
    system: SystemSpec,
    monitoringConfig: MonitoringConfig
  ) => TaskEither<Error, ObservabilityStack>
}
```

### **2. Infrastructure as Code (IaC) Framework**

```typescript
// OpenTofu/Terraform управление инфраструктурой
const manageInfrastructure = (
  config: InfrastructureConfig,
  environment: Environment
): TaskEither<Error, InfrastructureState> => {
  return pipe(
    // Анализ требований инфраструктуры
    analyzeInfrastructureRequirements(config),

    // Генерация OpenTofu конфигурации
    chain(generateOpenTofuConfig),

    // Валидация конфигурации
    chain(validateInfrastructureConfig),

    // Планирование изменений
    chain(planInfrastructureChanges),

    // Применение изменений
    chain(applyInfrastructureChanges),

    // Валидация состояния
    map(validateInfrastructureState)
  )
}

// Компоненты инфраструктуры
const infrastructureComponents = {
  // Вычислительные ресурсы
  compute: {
    // VM instances
    virtualMachines: defineVirtualMachines,
    // Containers
    containers: defineContainers,
    // Serverless functions
    serverless: defineServerlessFunctions,
    // Kubernetes clusters
    kubernetes: defineKubernetesCluster
  },

  // Сетевые ресурсы
  network: {
    // VPCs и подсети
    vpc: defineVPC,
    loadBalancers: defineLoadBalancers,
    cdn: defineCDN,
    firewall: defineFirewallRules
  },

  // Хранилище данных
  storage: {
    // Объектное хранилище
    objectStorage: defineObjectStorage,
    // Блочное хранилище
    blockStorage: defineBlockStorage,
    // Базы данных
    databases: defineDatabases,
    // Кэширование
    cache: defineCacheLayer
  },

  // Безопасность
  security: {
    // IAM и управление доступом
    identity: defineIdentityManagement,
    // Шифрование
    encryption: defineEncryption,
    // Secrets management
    secrets: defineSecretsManagement
  }
}
```

### **3. OpenTofu Configuration Generation**

```typescript
// Генерация OpenTofu конфигурации
const generateOpenTofuConfig = (
  spec: InfrastructureSpec
): TaskEither<Error, OpenTofuConfig> => {
  return pipe(
    // Основная конфигурация
    generateMainConfig(spec),

    // Переменные
    chain(generateVariables),

    // Outputs
    chain(generateOutputs),

    // Модули
    map(generateModules),

    // Backend configuration
    map(generateBackendConfig)
  )
}

// Пример: Создание модуля для веб-приложения
const createWebApplicationModule = (
  config: WebAppConfig
): OpenTofuModule => {
  return {
    main: generateMainTf({
      resources: [
        // Compute instance
        {
          type: 'docker_container',
          name: 'web_app',
          config: {
            image: config.image,
            ports: config.ports,
            environment: config.environment,
            restart: 'unless-stopped'
          }
        },

        // Load balancer
        {
          type: 'docker_container',
          name: 'load_balancer',
          config: {
            image: 'nginx:alpine',
            ports: ['80:80', '443:443'],
            volumes: ['./nginx.conf:/etc/nginx/nginx.conf:ro'],
            depends_on: ['web_app']
          }
        },

        // Database
        {
          type: 'docker_container',
          name: 'database',
          config: {
            image: 'postgres:alpine',
            environment: {
              POSTGRES_DB: config.database.name,
              POSTGRES_USER: config.database.user,
              POSTGRES_PASSWORD: config.database.password
            },
            volumes: ['db_data:/var/lib/postgresql/data'],
            restart: 'unless-stopped'
          }
        },

        // Redis cache
        {
          type: 'docker_container',
          name: 'cache',
          config: {
            image: 'redis:alpine',
            restart: 'unless-stopped'
          }
        }
      ],

      networks: [
        {
          name: 'app_network',
          driver: 'bridge'
        }
      ],

      volumes: [
        {
          name: 'db_data'
        }
      ]
    }),

    variables: generateVariableDefinitions(config),

    outputs: generateOutputDefinitions({
      appUrl: 'http://localhost',
      databaseUrl: 'postgresql://...',
      cacheUrl: 'redis://localhost'
    })
  }
}
```

---

## 🔄 CI/CD Pipeline Automation

### **1. Pipeline Orchestration**

```typescript
// CI/CD Pipeline orchestration
const orchestrateCICD = (
  pipeline: PipelineConfig,
  context: DeploymentContext
): TaskEither<Error, PipelineExecution> => {
  return pipe(
    // Создание pipeline конфигурации
    generatePipelineConfig(pipeline),

    // Настройка триггеров
    chain(setupPipelineTriggers),

    // Конфигурация stages
    chain(configurePipelineStages),

    // Интеграция с тестами
    chain(integrateTesting),

    // Настройка деплоя
    chain(setupDeployment),

    map(executePipeline)
  )
}

// Стандартные stages в pipeline
const pipelineStages = {
  // 1. Source Code Management
  source: {
    checkout: checkoutSourceCode,
    lint: runLinting,
    format: checkCodeFormat
  },

  // 2. Build
  build: {
    install: installDependencies,
    compile: compileCode,
    bundle: createBundles,
    buildImage: buildDockerImage
  },

  // 3. Test
  test: {
    unit: runUnitTests,
    integration: runIntegrationTests,
    e2e: runE2ETests,
    security: runSecurityTests,
    coverage: generateCoverageReport
  },

  // 4. Security Scan
  security: {
    sast: runSAST,
    dast: runDAST,
    dependencies: scanDependencies,
    container: scanContainer
  },

  // 5. Deploy
  deploy: {
    staging: deployToStaging,
    smoke: runSmokeTests,
    production: deployToProduction,
    postDeploy: runPostDeployTests
  },

  // 6. Notify
  notify: {
    slack: notifySlack,
    email: sendEmail,
    dashboard: updateDashboard
  }
}
```

### **2. GitLab CI Integration**

```typescript
// GitLab CI/CD конфигурация
const generateGitLabCI = (
  config: PipelineConfig
): GitLabCIConfig => {
  return {
    stages: [
      'lint',
      'test',
      'build',
      'security',
      'deploy-staging',
      'deploy-production'
    ],

    jobs: {
      // Lint job
      'lint-code': {
        stage: 'lint',
        image: 'node:latest',
        script: [
          'npm ci',
          'npm run lint',
          'npm run typecheck'
        ],
        rules: [
          { if: '$CI_PIPELINE_SOURCE == "push"' },
          { if: '$CI_PIPELINE_SOURCE == "merge_request_event"' }
        ]
      },

      // Test jobs
      'unit-tests': {
        stage: 'test',
        image: 'node:latest',
        script: [
          'npm ci',
          'npm run test:unit',
          'npm run test:coverage'
        ],
        coverage: '/Coverage: \\d+\\.\\d+ %/',
        artifacts: {
          reports: {
            coverage_report: {
              coverage_format: 'cobertura',
              path: 'coverage/cobertura-coverage.xml'
            }
          },
          paths: ['coverage/'],
          expire_in: '1 week'
        }
      },

      'e2e-tests': {
        stage: 'test',
        image: 'cypress/included:latest',
        script: [
          'npm run test:e2e'
        ],
        services: [
          {
            name: 'postgres:alpine',
            alias: 'postgres'
          }
        ],
        variables: {
          POSTGRES_HOST: 'postgres',
          POSTGRES_USER: 'test',
          POSTGRES_PASSWORD: 'test'
        }
      },

      // Security scan
      'security-scan': {
        stage: 'security',
        image: 'securecodewarrior/semgrep',
        script: [
          'semgrep --config=auto --json --output=semgrep-report.json src/'
        ],
        artifacts: {
          reports: {
            sast: 'semgrep-report.json'
          }
        }
      },

      // Build
      'build-image': {
        stage: 'build',
        image: 'docker:latest',
        services: ['docker:dind'],
        script: [
          'docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .',
          'docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA'
        ]
      },

      // Deploy to staging
      'deploy-staging': {
        stage: 'deploy-staging',
        image: 'alpine:latest',
        script: [
          'op tofu init',
          'op tofu plan -var-file="environments/staging.tfvars"',
          'op tofu apply -auto-approve -var-file="environments/staging.tfvars"'
        ],
        environment: {
          name: 'staging',
          url: 'https://staging.example.com'
        },
        only: ['develop']
      },

      // Deploy to production
      'deploy-production': {
        stage: 'deploy-production',
        image: 'alpine:latest',
        script: [
          'op tofu init',
          'op tofu plan -var-file="environments/production.tfvars"',
          'op tofu apply -auto-approve -var-file="environments/production.tfvars"'
        ],
        environment: {
          name: 'production',
          url: 'https://example.com'
        },
        when: 'manual',
        only: ['main']
      }
    }
  }
}
```

---

## 📦 Container Orchestration

### **1. Docker Orchestration**

```typescript
// Docker orchestration
const orchestrateContainers = (
  services: ServiceSpec[],
  environment: Environment
): TaskEither<Error, ContainerOrchestration> => {
  return pipe(
    // Анализ сервисов
    analyzeServiceDependencies(services),

    // Создание docker-compose
    chain(generateDockerCompose),

    // Настройка сетей
    chain(configureNetworks),

    // Настройка томов
    chain(configureVolumes),

    // Оптимизация для production
    map(optimizeForProduction)
  )
}

// Пример docker-compose.yml генерации
const generateDockerCompose = (
  services: ServiceSpec[]
): TaskEither<Error, DockerComposeConfig> => {
  const compose = {
    version: '3.8',

    services: services.reduce((acc, service) => {
      acc[service.name] = {
        image: service.image,
        build: service.buildContext,
        ports: service.ports,
        environment: service.environment,
        volumes: service.volumes,
        networks: service.networks,
        depends_on: service.dependencies,
        restart: service.restartPolicy || 'unless-stopped',
        healthcheck: service.healthcheck,
        deploy: service.deployConfig
      }
      return acc
    }, {} as Record<string, ServiceConfig>),

    networks: generateNetworkConfig(services),

    volumes: generateVolumeConfig(services),

    secrets: generateSecretsConfig(services)
  }

  return right(compose)
}
```

### **2. Kubernetes Orchestration**

```typescript
// Kubernetes deployment
const deployToKubernetes = (
  services: ServiceSpec[],
  config: K8sConfig
): TaskEither<Error, K8sDeployment> => {
  return pipe(
    // Генерация namespace
    generateNamespace(config.namespace),

    // Генерация deployments
    chain(generateDeployments(services)),

    // Генерация services
    chain(generateServices(services)),

    // Генерация ingress
    chain(generateIngress(config)),

    // Генерация configmaps и secrets
    map(([namespace, deployments, services, ingress]) => ({
      namespace,
      deployments,
      services,
      ingress,
      configmaps: generateConfigMaps(services),
      secrets: generateSecrets(services),
      rbac: generateRBAC(services)
    }))
  )
}

// Пример deployment конфигурации
const createDeployment = (
  service: ServiceSpec
): K8sDeployment => {
  return {
    apiVersion: 'apps/v1',
    kind: 'Deployment',
    metadata: {
      name: service.name,
      namespace: service.namespace,
      labels: service.labels
    },
    spec: {
      replicas: service.replicas || 3,
      strategy: {
        type: 'RollingUpdate',
        rollingUpdate: {
          maxSurge: 1,
          maxUnavailable: 0
        }
      },
      selector: {
        matchLabels: service.selector
      },
      template: {
        metadata: {
          labels: service.labels
        },
        spec: {
          containers: [
            {
              name: service.name,
              image: service.image,
              ports: service.containerPorts,
              env: service.environmentVariables,
              envFrom: service.envFrom,
              volumeMounts: service.volumeMounts,
              resources: service.resources,
              livenessProbe: service.livenessProbe,
              readinessProbe: service.readinessProbe
            }
          ],
          volumes: service.volumes,
          nodeSelector: service.nodeSelector,
          affinity: service.affinity,
          tolerations: service.tolerations
        }
      }
    }
  }
}
```

---

## ☁️ Cloud-Native Architecture

### **1. Multi-Cloud Strategy**

```typescript
// Мультиоблачная стратегия
interface CloudStrategy {
  // AWS integration
  aws: {
    // Compute services
    ec2: manageEC2Instances,
    ecs: manageECS,
    eks: manageEKS,
    lambda: manageLambda,
    // Storage
    s3: manageS3,
    ebs: manageEBS,
    rds: manageRDS,
    // Networking
    vpc: manageVPC,
    cloudfront: manageCloudFront,
    // Security
    iam: manageIAM,
    secrets: manageSecretsManager
  }

  // GCP integration
  gcp: {
    // Compute services
    compute: manageComputeEngine,
    gke: manageGKE,
    cloudRun: manageCloudRun,
    // Storage
    gcs: manageGCS,
    cloudSQL: manageCloudSQL,
    // Networking
    vpc: manageVPC,
    loadBalancer: manageLoadBalancer,
    // Security
    iam: manageIAM,
    secretManager: manageSecretManager
  }

  // Azure integration
  azure: {
    // Compute services
    vm: manageVirtualMachines,
    aks: manageAKS,
    functions: manageFunctions,
    // Storage
    blob: manageBlobStorage,
    sql: manageSQLDatabase,
    // Networking
    vnet: manageVNet,
    loadBalancer: manageLoadBalancer,
    // Security
    iam: manageIAM,
    keyVault: manageKeyVault
  }
}
```

### **2. Serverless Architecture**

```typescript
// Serverless deployment
const deployServerless = (
  functions: ServerlessFunction[],
  config: ServerlessConfig
): TaskEither<Error, ServerlessDeployment> => {
  return pipe(
    // Анализ функций
    analyzeFunctionDependencies(functions),

    // Генерация serverless.yml
    chain(generateServerlessConfig),

    // Настройка IAM ролей
    chain(setupIAMRoles),

    // Конфигурация API Gateway
    chain(configureAPIGateway),

    // Настройка event sources
    chain(configureEventSources),

    // Деплой функций
    map(deployFunctions)
  )
}

// Serverless.yml конфигурация
const serverlessConfig: ServerlessConfig = {
  service: 'vibe-api',

  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'us-east-1',
    environment: {
      NODE_ENV: '${opt:stage, "dev"}'
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem'
            ],
            Resource: {
              'Fn::GetAtt': ['UsersTable', 'Arn']
            }
          }
        ]
      }
    }
  },

  functions: {
    getUser: {
      handler: 'handlers/getUser.handler',
      events: [
        {
          http: {
            path: 'users/{id}',
            method: 'get',
            cors: true
          }
        }
      ]
    },
    createUser: {
      handler: 'handlers/createUser.handler',
      events: [
        {
          http: {
            path: 'users',
            method: 'post',
            cors: true
          }
        }
      ]
    }
  },

  resources: {
    Resources: {
      UsersTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'users-${opt:stage, "dev"}',
          BillingMode: 'PAY_PER_REQUEST',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S'
            }
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH'
            }
          ]
        }
      }
    }
  }
}
```

---

## 📊 Observability & Monitoring

### **1. Observability Stack Setup**

```typescript
// Настройка observability
const setupObservability = (
  system: SystemSpec,
  config: MonitoringConfig
): TaskEither<Error, ObservabilityStack> => {
  return pipe(
    // Prometheus setup
    setupPrometheus(config.metrics),

    // Grafana setup
    setupGrafana(config.dashboards),

    // Loki setup
    setupLoki(config.logs),

    // Jaeger setup
    setupJaeger(config.tracing),

    map(({ prometheus, grafana, loki, jaeger }) => ({
      prometheus,
      grafana,
      loki,
      jaeger,
      alertManager: setupAlertManager(config.alerts),
      nodeExporter: setupNodeExporter()
    }))
  )
}
```

### **2. Metrics & Alerting**

```typescript
// Метрики для мониторинга
interface MonitoringMetrics {
  // Infrastructure metrics
  infrastructure: {
    cpu: {
      usage: percentage
      load: number
      throttling: boolean
    }
    memory: {
      usage: percentage
      swap: boolean
      oomKill: boolean
    }
    disk: {
      usage: percentage
      iowait: number
      spaceLeft: bytes
    }
    network: {
      bandwidth: bytes_per_second
      packetsDropped: number
      latency: milliseconds
    }
  }

  // Application metrics
  application: {
    requests: {
      total: number
      success: number
      error: number
      latency: milliseconds
    }
    database: {
      connections: number
      slowQueries: number
      locks: number
    }
    cache: {
      hitRate: percentage
      missRate: percentage
      size: bytes
    }
  }

  // Business metrics
  business: {
    activeUsers: number
    conversionRate: percentage
    revenue: currency
    errorBudget: percentage
  }
}
```

---

## 🔒 DevSecOps Integration

### **1. Security in Pipeline**

```typescript
// Интеграция безопасности в pipeline
const integrateSecurityScanning = (
  pipeline: PipelineConfig
): PipelineConfig => {
  return {
    ...pipeline,
    stages: [
      ...pipeline.stages,
      'security-scan',
      'compliance-check'
    ],
    jobs: {
      ...pipeline.jobs,

      // SAST (Static Application Security Testing)
      'sast-scan': {
        stage: 'security-scan',
        image: 'securecodewarrior/semgrep',
        script: [
          'semgrep --config=auto --json --output=sast-report.json ./src/',
          'semgrep --sarif --output=sast-report.sarif ./src/'
        ],
        artifacts: {
          reports: {
            sast: 'sast-report.sarif'
          }
        }
      },

      // DAST (Dynamic Application Security Testing)
      'dast-scan': {
        stage: 'security-scan',
        image: 'owasp/zap2docker-stable',
        script: [
          'zap-baseline.py -t https://staging.example.com -J dast-report.json'
        ],
        artifacts: {
          reports: {
            dast: 'dast-report.json'
          }
        }
      },

      // Dependency scanning
      'dependency-scan': {
        stage: 'security-scan',
        image: 'aquasec/trivy:latest',
        script: [
          'trivy fs --format json --output dependency-report.json ./'
        ],
        artifacts: {
          reports: {
            dependency_scanning: 'dependency-report.json'
          }
        }
      },

      // Container scanning
      'container-scan': {
        stage: 'security-scan',
        image: 'aquasec/trivy:latest',
        script: [
          'trivy image --format json --output container-report.json $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA'
        ],
        artifacts: {
          reports: {
            container_scanning: 'container-report.json'
          }
        }
      }
    }
  }
}
```

---

## 🔗 Integration with Agent Ecosystem

### **Collaborative DevOps Process**

```typescript
// Координация с другими агентами для DevOps
const orchestrateDevOpsWorkflow = (
  codebase: Codebase,
  context: DevOpsContext
): TaskEither<Error, DevOpsExecutionPlan> => {
  return pipe(
    // VIBE-CODER предоставляет код
    receiveCodeFromCoder(codebase),

    // VIBE-TESTER обеспечивает тесты
    chain(VIBE_TESTER.validateTestCoverage),

    // VIBE-SECURITY проводит аудит
    chain(VIBE_SECURITY.conductSecurityAudit),

    // VIBE-SENTRY настраивает мониторинг
    chain(VIBE_SENTRY.setupMonitoring),

    // VIBE-CRITIC проверяет качество
    chain(VIBE_CRITIC.analyzeQuality),

    map(([code, tests, security, monitoring, quality]) => ({
      infrastructure: generateInfrastructurePlan(code),
      pipeline: generateCICDPlan({ code, tests, security }),
      monitoring: monitoring.setup,
      qualityGate: quality.gate,
      deployment: createDeploymentPlan({
        code,
        tests,
        security,
        monitoring,
        quality
      })
    }))
  )
}
```

---

## 💡 Best Practices

### **1. Infrastructure as Code**
- ✅ **Версионирование** - вся инфраструктура в Git
- ✅ **Модульность** - переиспользуемые модули
- ✅ **Параметризация** - переменные для разных окружений
- ✅ **Планирование** - всегда план перед применением
- ✅ **Документация** - self-documenting код

### **2. CI/CD Pipeline**
- ✅ **Fast Feedback** - быстрая обратная связь
- ✅ **Automated Testing** - все типы тестов автоматически
- ✅ **Security Gates** - проверки безопасности на каждом этапе
- ✅ **Blue-Green Deployment** - без простоев
- ✅ **Rollback Ready** - готовность к откату

### **3. Container Orchestration**
- ✅ **Stateless Applications** - приложения без состояния
- ✅ **Health Checks** - проверки здоровья контейнеров
- ✅ **Resource Limits** - лимиты ресурсов
- ✅ **Horizontal Scaling** - горизонтальное масштабирование
- ✅ **Security Context** - контекст безопасности

### **4. Observability**
- ✅ **Three Pillars** - метрики, логи, трассировка
- ✅ **Distributed Tracing** - распределенная трассировка
- ✅ **Alerting** - умные алерты
- ✅ **Dashboards** - информативные дашборды
- ✅ **SLI/SLO** - индикаторы и цели уровня сервиса

---

## 🔄 Version 2.0.45+ Features

### **Новое в v2.0.45:**
- ✅ **OpenTofu Integration** - полная интеграция с OpenTofu
- ✅ **GitLab CI/CD** - готовая конфигурация pipeline
- ✅ **Multi-Cloud Support** - AWS, GCP, Azure
- ✅ **Kubernetes Orchestration** - деплой в K8s
- ✅ **DevSecOps Pipeline** - встроенная безопасность

### **v2.0.46 Planned Features:**
- 🔄 **GitOps Workflow** - GitOps с ArgoCD
- 🔄 **Service Mesh** - Istio integration
- 🔄 **Policy as Code** - OPA/Gatekeeper
- 🔄 **Cost Optimization** - автоматическая оптимизация затрат
- 🔄 **Platform Engineering** - Internal Developer Platform

---

## 🎓 Professional Competencies

### **Core Expertise:**
1. **Infrastructure Engineering** - проектирование инфраструктуры
2. **CI/CD Pipeline Design** - создание пайплайнов
3. **Cloud Architecture** - облачная архитектура
4. **Container Orchestration** - оркестрация контейнеров
5. **Observability** - мониторинг и наблюдаемость

### **Technical Skills:**
- **OpenTofu/Terraform** - Infrastructure as Code
- **Kubernetes** - оркестрация контейнеров
- **Docker** - контейнеризация
- **GitLab CI/CD** - пайплайны
- **Monitoring Stack** - Prometheus, Grafana, Loki
- **Cloud Platforms** - AWS, GCP, Azure
- **Security Scanning** - SAST, DAST, dependency scanning

---

*VIBE-DEVOPS: Превращаем инфраструктуру в код, а деплой в автоматизацию! 🚀✨*

**DevOps Orchestrator - От кода к production за минуты! ⚡☁️**
