import bcrypt from 'bcryptjs';

export const initialCategories = [
  {
    id: "cat-1",
    name: "Software Development",
    slug: "software-development",
    description: "Modern architectural paradigms, language runtimes, distributed design, and engineering craft.",
    displayOrder: 1
  },
  {
    id: "cat-2",
    name: "Artificial Intelligence & Machine Learning",
    slug: "artificial-intelligence",
    description: "Deep learning benchmarks, autonomous agent architectures, neural networks, and LLM optimization.",
    displayOrder: 2
  },
  {
    id: "cat-3",
    name: "Web and Mobile App Development",
    slug: "web-mobile-development",
    description: "Next-generation frontend ecosystems, WebAssembly runtimes, cross-platform mobile frameworks, and UX performance.",
    displayOrder: 3
  },
  {
    id: "cat-4",
    name: "Technology & Innovation",
    slug: "technology-innovation",
    description: "Emerging technological revolutions, spatial computing, quantum supremacy, and frontier breakthroughs.",
    displayOrder: 4
  },
  {
    id: "cat-5",
    name: "Cybersecurity",
    slug: "cybersecurity",
    description: "Zero-trust network architectures, post-quantum cryptographic primitives, vulnerability intelligence, and offensive defense.",
    displayOrder: 5
  },
  {
    id: "cat-6",
    name: "Cloud Computing",
    slug: "cloud-computing",
    description: "Serverless topology, hybrid mesh architectures, multi-region data egress reduction, and container orchestrations.",
    displayOrder: 6
  },
  {
    id: "cat-7",
    name: "Industry Insights",
    slug: "industry-insights",
    description: "Macro technology economics, executive enterprise leadership, developer productivity indices, and regulatory shifts.",
    displayOrder: 7
  }
];

export const initialAuthors = [
  {
    id: "auth-1",
    name: "Dr. Elena Vance",
    email: "elena.vance@techpulse.io",
    roleTitle: "Lead AI Research Fellow",
    bio: "Elena specializes in multi-agent orchestration, reinforcement learning, and neural network latency minimization with 12+ years in applied AI research.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    socialLinks: {
      twitter: "https://x.com/elenavance",
      linkedin: "https://linkedin.com/in/elenavance",
      github: "https://github.com/elenavance"
    }
  },
  {
    id: "auth-2",
    name: "Devlin Ross",
    email: "devlin.ross@techpulse.io",
    roleTitle: "Principal Cloud Architect",
    bio: "Devlin leads high-throughput distributed systems and zero-egress data meshes across hybrid cloud platforms.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    socialLinks: {
      twitter: "https://x.com/devlinross",
      linkedin: "https://linkedin.com/in/devlinross",
      github: "https://github.com/devlinross"
    }
  },
  {
    id: "auth-3",
    name: "Marcus Thorne",
    email: "marcus.thorne@techpulse.io",
    roleTitle: "Senior Security Architect",
    bio: "Marcus specializes in cryptographic protocols, zero-trust infrastructure, and automated vulnerability mitigation.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    socialLinks: {
      twitter: "https://x.com/marcusthorne",
      linkedin: "https://linkedin.com/in/marcusthorne",
      github: "https://github.com/marcusthorne"
    }
  },
  {
    id: "auth-4",
    name: "Sarah Lin",
    email: "sarah.lin@techpulse.io",
    roleTitle: "Lead Frontend Systems Engineer",
    bio: "Sarah focuses on WebAssembly runtime compilers, micro-frontend topologies, and ultra-low-latency UI rendering.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    socialLinks: {
      twitter: "https://x.com/sarahlin_dev",
      linkedin: "https://linkedin.com/in/sarahlin",
      github: "https://github.com/sarahlin"
    }
  }
];

export const initialArticles = [
  {
    id: "art-1",
    title: "Zero-Egress Storage Architectures: Designing Hybrid Cloud Resilience",
    slug: "zero-egress-storage-architectures-hybrid-cloud-resilience",
    shortDescription: "A comprehensive engineering breakdown of avoiding provider lock-in and eliminating outbound transfer egress costs in distributed cloud architectures.",
    content: `## 1. The Real Cost of Multi-Cloud Data Gravity

Enterprise organizations operating high-throughput multi-cloud environments consistently identify outbound network transfer fees—colloquially known as "egress tax"—as the primary economic friction preventing flexible disaster recovery and workload portability. When data pipelines span AWS, GCP, Azure, and private co-location centers, egress bills frequently exceed 35% of total infrastructure allocations.

Modern zero-egress architectures do not merely aim to lower bills; they redefine how persistent data layers are decoupled from compute fabrics. By strategically positioning immutable object stores behind open-protocol edge routers, engineering teams can achieve instant failover without financial penalty.

\`\`\`typescript
import { DistributedStore, ReplicationTopology } from '@techpulse/cloud-core';

export const storageEngine = new DistributedStore({
  endpoint: process.env.EDGE_STORAGE_URL,
  protocol: 's3-compatible',
  redundancyTier: ReplicationTopology.MULTI_REGION_ACTIVE,
  autoEviction: {
    maxTtlDays: 90,
    hotColdThresholdMb: 250
  }
});
\`\`\`

---

## 2. Distributed Object Storage vs. Centralized Buckets

To analyze the performance trade-offs, our engineering team benchmarked synchronous cross-zone writes against asynchronous eventual-consistency meshes across 10 million payloads:

| Metric Criteria | Centralized Cloud S3 | Zero-Egress Edge Mesh | Variance Ratio |
| :--- | :--- | :--- | :--- |
| Average P99 Read Latency | 64ms | 18ms | **-71.8%** |
| Outbound Egress Surcharge | $0.09 / GB | $0.00 / GB | **100% Free** |
| Cross-Region Replication Time | 3.2s | 1.1s | **-65.6%** |
| SLA Availability Target | 99.99% | 99.999% | Tier 1 Resilience |

> **Architectural Recommendation**: When deploying distributed storage backplanes, always enforce cryptographic object hashing at the ingress boundary. This mitigates split-brain anomalies and verifies chunk integrity across peer edge nodes.

---

## 3. Implementation Blueprint with Custom Edge Interceptors

By implementing lightweight proxy sidecars alongside your container pods, client applications remain agnostic to physical data locations while achieving transparent read-through caching.`,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      alt: "Global Cloud Data Network and Storage Topology",
      caption: "Figure 1: Global Edge Mesh Routing and Storage Node Topology"
    },
    category: "cat-6",
    tags: ["Cloud Computing", "DevOps", "Storage", "Multi-Cloud"],
    author: "auth-2",
    status: "published",
    isFeatured: true,
    viewsCount: 14200,
    estimatedReadingTime: 8,
    publishedAt: new Date("2026-11-09T08:00:00Z"),
    scheduledFor: null,
    seo: {
      metaTitle: "Zero-Egress Storage Architectures | TechPulse Engineering",
      metaDescription: "Learn how to eliminate cloud provider egress costs and architect zero-lockin hybrid storage meshes with open protocols.",
      canonicalUrl: "https://techpulse.io/articles/zero-egress-storage-architectures-hybrid-cloud-resilience"
    }
  },
  {
    id: "art-2",
    title: "The Next Frontier of Agentic AI: Autonomous Reasoning Loops",
    slug: "next-frontier-agentic-ai-autonomous-reasoning-loops",
    shortDescription: "How structured reflection, multi-step planning engines, and recursive self-correction are transforming generative models into autonomous software engineers.",
    content: `## 1. Beyond Passive Language Models

The evolution of artificial intelligence has transitioned through three distinct epochs: static retrieval, predictive chat completions, and now autonomous agentic loops. Where early generation models produced point-in-time answers, agentic systems operate as persistent cognitive state machines capable of observing environment feedback, adjusting internal plans, and executing tool actions.

\`\`\`python
class AutonomousAgentLoop:
    def __init__(self, reasoning_engine, toolset):
        self.engine = reasoning_engine
        self.tools = toolset
        self.memory_buffer = []

    async def execute_task(self, user_goal: str):
        plan = await self.engine.synthesize_plan(user_goal)
        for step in plan.iter_steps():
            observation = await self.tools.invoke(step.tool_call)
            self.memory_buffer.append(observation)
            if not step.verify(observation):
                plan = await self.engine.re_plan(plan, observation)
        return plan.summarize()
\`\`\`

---

## 2. Memory Topologies & Context Compaction

Autonomous systems cannot succeed without efficient memory management. Because LLM context windows incur quadratic attention costs and token limits, production agent networks rely on semantic memory indexing and automatic rolling summaries:

1. **Episodic Memory**: Short-term execution scratchpads preserved during single execution sessions.
2. **Semantic Knowledge Store**: Vector-indexed corporate domain artifacts and documentation.
3. **Procedural Memory**: Pre-compiled validation schemas, syntax guides, and deterministic unit tests.

> "True intelligence is measured not by how fast an algorithm predicts the next token, but by how reliably it recovers when its first prediction fails." — *Dr. Elena Vance*`,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
      alt: "Artificial Intelligence Neural Network Visualization",
      caption: "Figure 2: Multi-Agent Recursive Reasoning Pipeline"
    },
    category: "cat-2",
    tags: ["Artificial Intelligence", "Machine Learning", "Autonomous Agents", "LLMs"],
    author: "auth-1",
    status: "published",
    isFeatured: true,
    viewsCount: 11800,
    estimatedReadingTime: 10,
    publishedAt: new Date("2026-11-10T10:30:00Z"),
    scheduledFor: null,
    seo: {
      metaTitle: "Autonomous Reasoning Loops in Agentic AI | TechPulse",
      metaDescription: "An in-depth analysis of recursive agent loops, planning engines, and error recovery in modern AI architecture.",
      canonicalUrl: "https://techpulse.io/articles/next-frontier-agentic-ai-autonomous-reasoning-loops"
    }
  },
  {
    id: "art-3",
    title: "Post-Quantum Cryptography in Enterprise Infrastructure",
    slug: "post-quantum-cryptography-enterprise-infrastructure",
    shortDescription: "Practical implementation strategies for NIST-standardized lattice-based encryption algorithms to defend enterprise communication against Q-Day threats.",
    content: `## 1. The Quantum Threat Horizon

Quantum computers capable of executing Shor's algorithm threaten the mathematical foundations of modern public-key cryptography, including RSA, Diffie-Hellman, and Elliptic Curve Cryptography (ECC). While fault-tolerant quantum hardware remains under active development, threat actors are currently executing **"Harvest Now, Decrypt Later"** campaigns.

Any sensitive information transmitted over public networks today with a shelf-life exceeding 5 years is already vulnerable to future decryption.

\`\`\`rust
use pqcrypto_traits::kem::{PublicKey, SecretKey, SharedSecret};
use pqcrypto_kyber::kyber768;

pub fn establish_quantum_safe_channel() -> (Vec<u8>, Vec<u8>) {
    let (pk, sk) = kyber768::keypair();
    let (ss, ciphertext) = kyber768::encapsulate(&pk);
    (ciphertext.as_bytes().to_vec(), ss.as_bytes().to_vec())
}
\`\`\`

---

## 2. NIST Standardized Post-Quantum Primitives

The National Institute of Standards and Technology (NIST) has officially released primary post-quantum cryptographic standards:

- **ML-KEM (Module-Lattice-Based Key-Encapsulation Mechanism)**: Standardized for general encryption and key exchange.
- **ML-DSA (Module-Lattice-Based Digital Signature Algorithm)**: Standardized for primary digital signature generation.
- **SLH-DSA (Stateless Hash-Based Digital Signature Algorithm)**: Robust fallback based purely on cryptographic hash security.`,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      alt: "Quantum Computing Hardware and Quantum Encryption",
      caption: "Figure 3: Quantum Key Distribution and Lattice-Based Primitives"
    },
    category: "cat-5",
    tags: ["Cybersecurity", "Cryptography", "Quantum Computing", "Enterprise Security"],
    author: "auth-3",
    status: "published",
    isFeatured: true,
    viewsCount: 8900,
    estimatedReadingTime: 11,
    publishedAt: new Date("2026-11-08T09:15:00Z"),
    scheduledFor: null,
    seo: {
      metaTitle: "Post-Quantum Cryptography Guide | TechPulse Security",
      metaDescription: "Defend your enterprise infrastructure against quantum decryption with NIST ML-KEM and hybrid cryptographic handshakes.",
      canonicalUrl: "https://techpulse.io/articles/post-quantum-cryptography-enterprise-infrastructure"
    }
  },
  {
    id: "art-4",
    title: "Modern Micro-Frontends at Scale: Architecture Patterns for 2026",
    slug: "modern-micro-frontends-at-scale-2026",
    shortDescription: "Decoupling monolithic web applications using Module Federation 2.0, WebAssembly shared runtimes, and isolated design token pipelines.",
    content: `## 1. Why Monolithic Frontends Break Down

When engineering organizations scale beyond 100 developers, centralized frontend repositories quickly encounter continuous integration bottlenecks, regression cascades, and conflicting dependencies. Micro-frontend architectures solve these organizational friction points by aligning deployment boundaries with business domains.

Modern implementations in 2026 reject heavyweight iframes in favor of dynamic Module Federation and shared memory WebAssembly runtimes.

\`\`\`javascript
// federated.config.js
export default {
  name: 'billing_dashboard',
  filename: 'remoteEntry.js',
  exposes: {
    './BillingCard': './src/components/BillingCard.jsx',
    './InvoiceTable': './src/components/InvoiceTable.jsx'
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.3.0' },
    'react-dom': { singleton: true }
  }
};
\`\`\`

---

## 2. Preventing Cumulative Layout Shift (CLS) Across Remote Boundaries

The most common failure mode in federated micro-apps is runtime layout jitter caused by asynchronously loaded chunks. By wrapping remote boundaries with fixed-aspect skeleton placeholders and declarative suspense boundaries, layout shift is completely eliminated.`,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      alt: "Source Code on Display Screen",
      caption: "Figure 4: Federated Architecture Dependency Graph"
    },
    category: "cat-3",
    tags: ["Web & Mobile", "Micro-Frontends", "React", "Architecture"],
    author: "auth-4",
    status: "published",
    isFeatured: false,
    viewsCount: 9500,
    estimatedReadingTime: 7,
    publishedAt: new Date("2026-11-06T14:20:00Z"),
    scheduledFor: null,
    seo: {
      metaTitle: "Modern Micro-Frontends at Scale (2026) | TechPulse",
      metaDescription: "Master Module Federation and runtime micro-frontends with high-performance CSS isolation and low CLS.",
      canonicalUrl: "https://techpulse.io/articles/modern-micro-frontends-at-scale-2026"
    }
  },
  {
    id: "art-5",
    title: "WebAssembly & Edge AI: High-Performance Client Computation",
    slug: "webassembly-edge-ai-high-performance-client-computation",
    shortDescription: "Running quantized neural networks directly within browser threads with WebGPU acceleration and zero server latency.",
    content: `## 1. Moving Machine Learning to the Client

Client-side execution of machine learning models has transitioned from an experimental curiosity into an essential cost-reduction strategy. By compiling ONNX and WebNN models into optimized WebAssembly modules with direct WebGPU access, developers can deliver sub-50ms inference times without paying for cloud GPU compute clusters.

---

## 2. Benchmark Comparisons: Client vs. Cloud API

| Model Size | Cloud API Roundtrip | Local WASM + WebGPU | Latency Reduction |
| :--- | :--- | :--- | :--- |
| 120M Parameter Embeddings | 240ms | 22ms | **-90.8%** |
| 1B Parameter Language Model | 850ms | 110ms | **-87.0%** |
| Image Segmentation Mask | 410ms | 35ms | **-91.4%** |`,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      alt: "Matrix Code and Neural Processing Representation",
      caption: "Figure 5: WebAssembly Thread Pooling Performance"
    },
    category: "cat-1",
    tags: ["Software Development", "WebAssembly", "Edge AI", "Performance"],
    author: "auth-4",
    status: "published",
    isFeatured: false,
    viewsCount: 7600,
    estimatedReadingTime: 6,
    publishedAt: new Date("2026-11-05T12:00:00Z"),
    scheduledFor: null,
    seo: {
      metaTitle: "WebAssembly & Edge AI Runtime Guide | TechPulse",
      metaDescription: "Run neural networks directly on browser threads with WebGPU and WebAssembly.",
      canonicalUrl: "https://techpulse.io/articles/webassembly-edge-ai-high-performance-client-computation"
    }
  },
  {
    id: "art-6",
    title: "Zero-Trust Security in Kubernetes 1.32 Clusters",
    slug: "zero-trust-security-kubernetes-1-32-clusters",
    shortDescription: "Enforcing mutual TLS, strict pod security standards, and automated ephemeral token rotation across cloud-native fleets.",
    content: `## 1. The Death of Perimeter Security

Modern cloud-native clusters operate under the assumption that internal networks are inherently hostile. Kubernetes 1.32 formalizes built-in zero-trust security capabilities, eliminating the reliance on static secrets or perimeter-only firewalls.

By leveraging mutual TLS (mTLS) with SPIFFE/SPIRE workload identities, every individual pod cryptographically proves its authenticity on every RPC call.`,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
      alt: "Cybersecurity Shield and Digital Defense Lock",
      caption: "Figure 6: Kubernetes Zero-Trust Workload Identity Mesh"
    },
    category: "cat-5",
    tags: ["Cybersecurity", "Kubernetes", "Zero-Trust", "Cloud Native"],
    author: "auth-3",
    status: "published",
    isFeatured: false,
    viewsCount: 8200,
    estimatedReadingTime: 9,
    publishedAt: new Date("2026-11-03T16:45:00Z"),
    scheduledFor: null,
    seo: {
      metaTitle: "Zero-Trust Security in Kubernetes 1.32 | TechPulse",
      metaDescription: "Step-by-step guide to mTLS, SPIRE identity attestations, and immutable pod enforcement.",
      canonicalUrl: "https://techpulse.io/articles/zero-trust-security-kubernetes-1-32-clusters"
    }
  },
  {
    id: "art-7",
    title: "The Macroeconomics of AI Infrastructure in 2026",
    slug: "macroeconomics-ai-infrastructure-2026",
    shortDescription: "Analyzing hyperscaler capital expenditures, energy constraints, and the shifting enterprise ROI on customized foundational models.",
    content: `## 1. The Capex Tsunami and Power Realities

Global spending on specialized data center facilities, high-density liquid cooling, and next-gen silicon has outpaced traditional cloud buildouts by an order of magnitude. However, energy availability has emerged as the true bottleneck for global computing expansion.

In this market analysis, we evaluate the financial models of tier-1 enterprises transitioning from generic public models to self-hosted domain-specific models.`,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      alt: "Modern Abstract Architectural Structure",
      caption: "Figure 7: Global Data Center Infrastructure Expenditure Trends"
    },
    category: "cat-7",
    tags: ["Industry Insights", "Economics", "AI Hardware", "Enterprise Strategy"],
    author: "auth-1",
    status: "published",
    isFeatured: false,
    viewsCount: 6400,
    estimatedReadingTime: 8,
    publishedAt: new Date("2026-11-01T11:10:00Z"),
    scheduledFor: null,
    seo: {
      metaTitle: "AI Infrastructure Macroeconomics (2026) | TechPulse Insights",
      metaDescription: "Understand energy limits, GPU capital expenditure cycles, and enterprise return on investment.",
      canonicalUrl: "https://techpulse.io/articles/macroeconomics-ai-infrastructure-2026"
    }
  },
  {
    id: "art-8",
    title: "Quantum Key Distribution: The Future of Sovereign Networks",
    slug: "quantum-key-distribution-sovereign-networks",
    shortDescription: "Scheduled editorial exploration into entanglement-based quantum communications and satellite-to-ground key transmission.",
    content: `## Scheduled Paper Overview

This comprehensive technical report will examine the deployment of satellite-based quantum key distribution (QKD) nodes for intercontinental banking transfers and government communications. Complete verification protocols and hardware topologies will be presented upon live release.`,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
      alt: "Optical Fiber Network Communication",
      caption: "Figure 8: Photonic Entanglement Channel"
    },
    category: "cat-4",
    tags: ["Technology & Innovation", "Quantum", "Networks"],
    author: "auth-3",
    status: "scheduled",
    isFeatured: false,
    viewsCount: 0,
    estimatedReadingTime: 5,
    publishedAt: null,
    scheduledFor: new Date(Date.now() + 86400000 * 3), // 3 days from now
    seo: {
      metaTitle: "Quantum Key Distribution Overview | TechPulse",
      metaDescription: "Scheduled deep dive into satellite-to-ground quantum communications.",
      canonicalUrl: "https://techpulse.io/articles/quantum-key-distribution-sovereign-networks"
    }
  }
];

export const initialAdminUser = {
  id: "user-admin-1",
  name: "TechPulse Editorial Admin",
  email: "admin@techpulse.io",
  passwordHash: bcrypt.hashSync("TechPulse2026!", 10),
  role: "superadmin"
};

export const initialPublisherUser = {
  id: "user-publisher-1",
  name: "Editorial Staff Publisher",
  email: "publisher@techpulse.io",
  passwordHash: bcrypt.hashSync("Publisher2026!", 10),
  role: "publisher"
};
