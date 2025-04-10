---
title: "Security Considerations When Using MCP"
date: 2025-04-09
draft: false
description: "includes code snippets"
tags: ["security", "llm", "mcp"]
categories: ["ai, development"]
---

Using MCP (Model Context Protocol) with LLMs introduces significant security considerations, but risks can be mitigated through careful implementation choices and adherence to established security practices. Here's a structured guide to safe MCP usage:

---

### **Generally Safe MCP Implementations**

1. **Read-Only Data Queries**
MCP servers restricted to querying databases or APIs without write access (e.g., `getWeather(city)` or `searchDocuments(query)`) pose minimal risk if properly scoped[^2][^5].
2. **Vendor-Approved MCP Servers**
Official MCP tools from trusted providers like OpenAI or Anthropic are safer than third-party implementations, as they undergo stricter security reviews[^1][^4].
3. **Local/Stdio-Based MCP**
Non-networked MCP servers running locally (e.g., CLI tools) avoid exposing public endpoints, reducing attack surfaces compared to HTTP-based implementations[^1][^4].
4. **Sandboxed Workflows**
MCP servers confined to containerized environments with read-only filesystems and restricted network egress limit potential damage from compromised tools[^2][^4].

---

### **Key Security Risks to Monitor**

| Risk Category | Examples | Mitigation Strategies |
| :-- | :-- | :-- |
| **Overprivileged Tools** | Unrestricted file access or HTTP requests | Enforce least privilege permissions[^2][^3] |
| **Unvetted Servers** | Unofficial Salesforce MCP implementations | Use only verified, signed MCP servers[^1][^4] |
| **Data Exfiltration** | LLM leaking secrets via external API calls | Proxy and log all external traffic[^2][^5] |
| **Prompt Injection** | Malicious inputs triggering risky actions | Sanitize inputs and lock system prompts[^2][^3] |
| **Lack of Observability** | Untraceable function calls | Implement end-to-end monitoring[^1][^5] |

---

### **Security Best Practices for MCP**

**1. Tool Design Principles**

- **Narrow Scope**: Expose only specific functions (e.g., `calculateTax(income)` vs. `executeRawSQL(query)`)[^2][^5].
- **Input Validation**: Restrict parameters (e.g., allow only predefined cities for weather queries)[^2][^5].
- **Error Safeguards**: Return plain-language errors for invalid requests (e.g., "Deletion not permitted")[^5].

**2. Infrastructure Hardening**

- **Network Controls**: Whitelist required domains and block all other egress traffic[^2][^4].
- **Secrets Management**: Use vaults instead of environment variables for credentials[^2][^3].
- **Runtime Isolation**: Run MCP servers in sandboxes with non-root users and read-only mounts[^2][^4].

**3. Operational Security**

- **Approval Workflows**: Require human review for high-risk actions (e.g., financial transactions)[^1][^3].
- **Activity Logging**: Record function names, parameters, and originating user/IP for auditing[^2][^5].
- **Version Pinning**: Cryptographically sign and pin MCP server versions to prevent supply chain attacks[^1][^3].

**4. Authentication Models**

- **Mandatory Auth**: Enforce OAuth2 or API keys even if MCP spec allows optional auth[^1][^5].
- **Context-Aware Permissions**: Dynamically adjust tool access based on user role and prompt intent[^1][^3].

---

By prioritizing narrowly scoped tools, enforcing strict access controls, and adopting zero-trust principles, organizations can leverage MCP's interoperability benefits while minimizing exposure to LLM-specific attack vectors[^1][^2][^3]. Regular audits and red-team exercises are recommended to validate security postures as MCP ecosystems evolve[^3][^5].

<div>⁂</div>

[^1]: https://protectai.com/blog/mcp-security-101

[^2]: https://www.linkedin.com/pulse/securing-large-language-models-mcp-mikhail-martiushov-dcg0f

[^3]: https://abcbyd.substack.com/p/mcp-cybersecurity-the-good-the-bad

[^4]: https://www.reddit.com/r/LLMDevs/comments/1jbqegg/model_context_protocol_mcp_clearly_explained/

[^5]: https://addyo.substack.com/p/mcp-what-it-is-and-why-it-matters

[^6]: https://modelcontextprotocol.io/specification/2025-03-26/index

[^7]: https://www.pillar.security/blog/the-security-risks-of-model-context-protocol-mcp

[^8]: https://infisical.com/blog/managing-secrets-mcp-servers

[^9]: https://blog.logto.io/what-is-mcp

[^10]: https://modelcontextprotocol.io/tutorials/building-mcp-with-llms

[^11]: https://developers.redhat.com/blog/2025/01/22/quick-look-mcp-large-language-models-and-nodejs

[^12]: https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompt-best-practices

[^13]: https://www.reddit.com/r/ClaudeAI/comments/1gzv8b9/anthropics_model_context_protocol_mcp_is_way/

[^14]: https://dev.to/alexmercedcoder/a-journey-from-ai-to-llms-and-mcp-8-resources-in-mcp-serving-relevant-data-securely-to-llms-2ei

[^15]: https://huggingface.co/blog/Kseniase/mcp

[^16]: https://modelcontextprotocol.io/introduction

[^17]: https://dagshub.com/blog/llm-evaluation-metrics/

[^18]: https://www.reddit.com/r/mcp/comments/1jl8j1n/how_does_an_llm_see_mcp_as_a_client/

[^19]: https://dev.to/alexmercedcoder/a-journey-from-ai-to-llms-and-mcp-9-tools-in-mcp-giving-llms-the-power-to-act-40cf

[^20]: https://www.reddit.com/r/mcp/comments/1j9vl64/using_mcp_with_an_llm_api_instead_of_claudes/

[^21]: https://equixly.com/blog/2025/03/29/mcp-server-new-security-nightmare/

[^22]: https://arxiv.org/html/2311.16169v3

[^23]: https://quantumzeitgeist.com/large-language-models-vulnerable-to-hacking-experts-weigh-in/

[^24]: https://forgepointcap.com/perspectives/margin-of-safety-9-mcp-usb-for-ai-or-trojan-horse-for-security/

[^25]: https://owasp.org/www-project-top-10-for-large-language-model-applications/

[^26]: https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks

[^27]: https://cetas.turing.ac.uk/publications/indirect-prompt-injection-generative-ais-greatest-security-flaw

[^28]: https://invariantlabs.ai/blog/whatsapp-mcp-exploited

[^29]: https://www.reddit.com/r/mcp/comments/1js3ocm/would_this_kind_of_security_tool_make_sense_for/

[^30]: https://www.arxiv.org/abs/2504.03767

[^31]: https://www.youtube.com/watch?v=ehuIrcxPLMU

[^32]: https://stytch.com/blog/model-context-protocol-introduction/

[^33]: https://www.anthropic.com/news/model-context-protocol

[^34]: https://aws.amazon.com/blogs/machine-learning/harness-the-power-of-mcp-servers-with-amazon-bedrock-agents/

[^35]: https://auth0.com/blog/an-introduction-to-mcp-and-authorization/

[^36]: https://www.danvega.dev/blog/2025/03/11/model-context-protocol-introduction

[^37]: https://stvansolano.github.io/2025/03/16/AI-Agents-Model-Context-Protocol-Explained/

[^38]: https://www.lasso.security/blog/llm-security

[^39]: https://www.linkedin.com/pulse/understanding-mcp-bridge-between-large-language-models-singh-crhkc

[^40]: https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/

[^41]: https://www.securecodewarrior.com/article/prompt-injection-and-the-security-risks-of-agentic-coding-tools

