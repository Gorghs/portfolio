export interface ProjectArchitecture {
    hld: string;
    lld: string;
    classDiagram: string;
    dataFlow: string;
    infrastructure: string;
    erDiagram: string;
}

export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    tech: string[];
    year: string;
    status: string;
    image: string;
    github: string;
    live: string | null;
    impact?: string[];
    challenges?: { title: string; description: string; solution: string }[];
    size?: 'small' | 'medium' | 'large';
    color: string;
    architecture?: ProjectArchitecture;
}

export const projects: Project[] = [
    {
        id: '01',
        title: 'Project Steve',
        category: 'AI Workflow Automation',
        description: 'AI-powered natural language to n8n workflow JSON generation system.',
        longDescription: 'Project Steve is a structured AI system that converts natural language prompts into production-ready n8n workflow JSON. It emphasizes deterministic output, portability, and memory-efficient deployment with small LLM architectures. The system reduces manual workflow configuration time while enforcing schema-safe automation generation.',
        tech: ['Python', 'n8n', 'LLM Fine-Tuning', 'JSON Schema Validation'],
        year: '2026',
        status: 'Active Development',
        image: '/image2.jpg',
        github: 'https://github.com/Gorghs/Project_steve',
        live: 'https://project-steve-ten.vercel.app',
        impact: [
            '4000+ Structured workflows generated',
            'Low-memory model optimization',
            'Deterministic JSON output design',
            'Reduced manual automation build time'
        ],
        challenges: [
            {
                title: 'JSON Inconsistency',
                description: 'Generated workflow structures showed schema variation across similar prompts.',
                solution: 'Applied strict output constraints and dataset normalization to preserve predictable schema patterns.'
            },
            {
                title: 'Node Hallucination',
                description: 'Models occasionally introduced unsupported or invalid workflow nodes.',
                solution: 'Added formatting guards and constrained generation templates to enforce valid node composition.'
            }
        ],
        size: 'large',
        color: 'from-red-500/20 to-orange-500/20',
        architecture: {
            hld: `flowchart TB
    U["User Prompt"]
    P["Prompt Parser"]
    M["Fine-tuned Small LLM"]
    V["Schema Validator"]
    J["n8n JSON Builder"]
    O["Workflow Output"]

    U --> P
    P --> M
    M --> V
    V --> J
    J --> O`,
            lld: `flowchart LR
    A["Input Handler"] --> B["Intent Classifier"]
    B --> C["Template Selector"]
    C --> D["Constraint Engine"]
    D --> E["JSON Compiler"]
    E --> F["Validation Layer"]`,
            classDiagram: `classDiagram
    class PromptRequest {
      +string text
      +string context
      +normalize()
    }
    class WorkflowGenerator {
      +generate(request)
      +applyConstraints()
    }
    class JsonValidator {
      +validate(schema, payload)
      +sanitize()
    }
    PromptRequest --> WorkflowGenerator
    WorkflowGenerator --> JsonValidator`,
            dataFlow: `sequenceDiagram
    participant U as User
    participant API as Generation API
    participant LLM as Fine-tuned Model
    participant VAL as Validator
    participant OUT as n8n JSON

    U->>API: Submit automation prompt
    API->>LLM: Build constrained generation request
    LLM-->>API: Candidate workflow structure
    API->>VAL: Validate schema and node map
    VAL-->>OUT: Deterministic workflow JSON
    OUT-->>U: Return ready-to-import output`,
            infrastructure: `flowchart TB
    subgraph DevOps
      G["GitHub"]
      L["Linux Runtime"]
      S["Small LLM Service"]
      A["API Layer"]
      N["n8n Import Target"]
    end

    G --> A
    L --> S
    A --> S
    A --> N`,
            erDiagram: `erDiagram
    PROMPT_DATASET {
      string id PK
      string prompt
      string intent
      datetime created_at
    }
    WORKFLOW_TEMPLATE {
      string id PK
      string intent
      json template
    }
    GENERATION_LOG {
      string id PK
      string dataset_id FK
      string template_id FK
      json output
      boolean valid
    }
    PROMPT_DATASET ||--o{ GENERATION_LOG : generates
    WORKFLOW_TEMPLATE ||--o{ GENERATION_LOG : applies`
        }
    },
    {
        id: '02',
        title: 'Earthify',
        category: 'Environmental Automation + IoT',
        description: 'Smart waste monitoring and logistics automation platform.',
        longDescription: 'Earthify is a scalable environmental monitoring and automation system for waste collection operations. It combines logistics flow planning, IoT modeling concepts, and backend data services to optimize routes. The platform is designed to scale from small industrial setups to large urban deployments.',
        tech: ['Backend APIs', 'IoT Integration', 'Route Optimization', 'Automation Logic'],
        year: '2026',
        status: 'Prototype / Pitch Stage',
        image: '/image2.jpg',
        github: 'https://github.com/Gorghs/EARTHIFY',
        live: 'https://earthify-1.onrender.com',
        impact: [
            'Industrial conveyor concept testing',
            'Automation-based route modeling',
            'Scalable architecture proposal',
            'Deployment-ready pitch documentation'
        ],
        challenges: [
            {
                title: 'Hardware Variability',
                description: 'Different sensor and hardware setups made direct deployment consistency difficult.',
                solution: 'Designed modular integration layers to isolate device-specific differences from core automation logic.'
            },
            {
                title: 'Logistics Complexity',
                description: 'Route planning needed adaptable logic across changing geographic and load conditions.',
                solution: 'Implemented logic-driven routing models with configurable operational constraints.'
            }
        ],
        size: 'medium',
        color: 'from-emerald-500/20 to-lime-500/20',
        architecture: {
            hld: `flowchart TB
    I["Input Sensors / Events"]
    C["Collection Controller"]
    R["Route Optimization Engine"]
    D["Dispatch API"]
    M["Monitoring Dashboard"]

    I --> C
    C --> R
    R --> D
    D --> M`,
            lld: `flowchart LR
    S["Sensor Adapter"] --> Q["Queue Handler"]
    Q --> E["Event Processor"]
    E --> P["Planning Rules"]
    P --> O["Operation Scheduler"]`,
            classDiagram: `classDiagram
    class DeviceEvent {
      +string id
      +string type
      +string location
      +float level
    }
    class RoutePlanner {
      +computeRoutes(events)
      +applyConstraints()
    }
    class DispatchService {
      +assignVehicles()
      +emitPlan()
    }
    DeviceEvent --> RoutePlanner
    RoutePlanner --> DispatchService`,
            dataFlow: `sequenceDiagram
    participant S as Sensor Stream
    participant A as API Layer
    participant R as Routing Engine
    participant D as Dispatch
    participant O as Operations

    S->>A: Submit waste level events
    A->>R: Aggregate and score zones
    R-->>D: Optimized route plan
    D-->>O: Dispatch instructions`,
            infrastructure: `flowchart TB
    subgraph Field
      X["IoT Input Nodes"]
    end
    subgraph Core
      API["Backend API"]
      ENG["Routing Logic Engine"]
      DB[("Operational Data")]
    end
    subgraph Control
      UI["Ops Dashboard"]
    end

    X --> API
    API --> ENG
    ENG --> DB
    UI --> API`,
            erDiagram: `erDiagram
    SENSOR_EVENT {
      string id PK
      string zone_id FK
      int level
      datetime ts
    }
    ZONE {
      string id PK
      string name
      string region
    }
    ROUTE_PLAN {
      string id PK
      string zone_id FK
      string route
      datetime created_at
    }
    ZONE ||--o{ SENSOR_EVENT : receives
    ZONE ||--o{ ROUTE_PLAN : optimized_for`
        }
    },
    {
        id: '03',
        title: 'S.A.G.E. – Semantic Adaptive Generative Engine',
        category: 'NLP / Semantic Intelligence',
        description: 'Embedding-based semantic ranking and similarity engine.',
        longDescription: 'S.A.G.E. is a semantic intelligence system built on SBERT-style embedding architecture. It enables efficient similarity scoring, contextual ranking, and intelligent content filtering without heavy inference. Vector similarity search pipelines support scalable semantic comparison.',
        tech: ['Python', 'SBERT-style Models', 'Vector Search', 'Cosine Similarity'],
        year: '2026',
        status: 'Experimental Development',
        image: '/image2.jpg',
        github: 'https://github.com/gorghs',
        live: 'https://github.com/gorghs',
        impact: [
            'High-precision similarity scoring',
            'Efficient embedding retrieval',
            'Low inference cost design',
            'Scalable automation integration'
        ],
        challenges: [
            {
                title: 'Embedding Drift',
                description: 'Embedding distributions shifted across dataset batches over time.',
                solution: 'Introduced normalization and calibration pipeline steps before final scoring.'
            },
            {
                title: 'Ranking Stability',
                description: 'Top-k semantic ranking varied under near-identical query structures.',
                solution: 'Refined cosine similarity tuning and thresholding with consistent rerank rules.'
            }
        ],
        size: 'medium',
        color: 'from-indigo-500/20 to-violet-500/20',
        architecture: {
            hld: `flowchart TB
    Q["Query Input"]
    E["Embedding Encoder"]
    V[("Vector Store")]
    R["Similarity Ranker"]
    F["Filtered Results"]

    Q --> E
    E --> V
    E --> R
    V --> R
    R --> F`,
            lld: `flowchart LR
    P["Preprocessor"] --> EN["Encoder"]
    EN --> IDX["Index Search"]
    IDX --> RR["Re-ranker"]
    RR --> OUT["Scored Output"]`,
            classDiagram: `classDiagram
    class SemanticQuery {
      +string text
      +tokenize()
    }
    class Embedder {
      +encode(text)
      +normalize(vector)
    }
    class SimilarityEngine {
      +search(queryVec)
      +rank(candidates)
    }
    SemanticQuery --> Embedder
    Embedder --> SimilarityEngine`,
            dataFlow: `sequenceDiagram
    participant U as User
    participant API as Semantic API
    participant EMB as Encoder
    participant VS as Vector Index
    participant RK as Ranker

    U->>API: Submit semantic query
    API->>EMB: Generate embedding
    EMB->>VS: Retrieve nearest vectors
    VS-->>RK: Candidate set
    RK-->>U: Ranked semantic matches`,
            infrastructure: `flowchart TB
    subgraph Runtime
      A["Python API"]
      M["Embedding Model"]
      I["Vector Index"]
      C["Cache Layer"]
    end

    A --> M
    M --> I
    A --> C
    I --> A`,
            erDiagram: `erDiagram
    DOCUMENT {
      string id PK
      string text
      string source
      datetime created_at
    }
    EMBEDDING {
      string id PK
      string document_id FK
      string vector_hash
    }
    QUERY_LOG {
      string id PK
      string query
      datetime ts
      string top_match
    }
    DOCUMENT ||--o{ EMBEDDING : represented_by
    QUERY_LOG }o--|| DOCUMENT : matched_to`
        }
    }
];
