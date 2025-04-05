---
title: "Leveraging LLMs for Code Generation: Insights and Strategies"
date: 2025-04-05
draft: false
description: "Briefing document on LLM coding insights"
tags: ["llm, coding"]
categories: ["development", "coding"]
---

### **Briefing Document**

**Purpose:** This document provides a detailed review of four recent sources discussing the use of Large Language Models (LLMs) for software development. It highlights the main themes, key ideas, and important facts presented, incorporating direct quotes where relevant. The sources offer valuable insights into effective strategies, potential pitfalls, and the evolving role of developers in an AI-assisted coding landscape.

---

### **Sources**

1. "[Here’s how I use LLMs to help me write code](https://simonwillison.net/2024/Mar/11/llms-write-code/)" by Simon Willison (Published 11th March 2025)
2. "[My LLM codegen workflow atm](https://harper.town/my-llm-codegen-workflow-atm)" by Harper Reed (Published 16th February 2025)
3. "[Senior Developer Skills in the AI Age: Leveraging Experience for Better Results](https://www.manuelkiessling.com/2024/03/30/senior-developer-skills-in-the-ai-age-leveraging-experience-for-better-results/)" by Manuel Kießling (No specific date provided in the excerpt, but context suggests recent)
4. "[You are using Cursor AI incorrectly...](https://geoffrey.io/blog/article/you-are-using-cursor-ai-incorrectly/)" by Geoffrey Huntley (Published 9th February 2025)

---

### **Main Themes and Important Ideas**

#### **1. LLM-Assisted Coding is Difficult and Requires a Shift in Mindset**

- Willison argues that using LLMs for code is "difficult and unintuitive." He cautions against the idea that it's easy:

> "If someone tells you that coding with LLMs is easy they are (probably unintentionally) misleading you."
- Huntley observes developers struggling with prompt underspecification, emphasizing that LLMs should not be treated as simple IDEs but as:

> "autonomous agent[s]."
- Kießling compares working with LLMs to managing junior developers, noting that achieving time savings requires "some upfront investment."

---

#### **2. Setting Realistic Expectations and Understanding LLM Limitations**

- Willison advises:

> "Set reasonable expectations" and "Ignore the 'AGI' hype—LLMs are still fancy autocomplete."
He suggests thinking of them as:

> "an over-confident pair programming assistant who’s lightning fast at looking things up."
- He warns against anthropomorphising LLMs, noting they will make mistakes, sometimes "deeply inhuman."

---

#### **3. Context is Paramount for Effective LLM Interactions**

- Willison declares:

> "Context is king."
He explains that context includes not just the initial prompt but the entire conversation history. Tools like Claude Projects and VS Code Copilot are praised for integrating session context.
- Reed emphasizes gathering relevant source code using tools like `repomix` to feed into the LLM.

---

#### **4. The Importance of Clear Instructions and Specifications**

- Willison advises developers to:

> "Tell them exactly what to do," providing examples of precise function signatures.
- Kießling advocates for well-structured requirements, detailing how his hierarchical 371-line Python project document was foundational to success.

---

#### **5. Rigorous Testing Remains a Critical Developer Responsibility**

- Willison stresses:

> "You have to test what it writes!"
He argues testing cannot be outsourced to machines.
- Kießling reinforces this with his emphasis on comprehensive quality tools like linters, type checkers, security analysis tools, and test suites.

---

#### **6. LLMs Facilitate Iteration and Learning**

- Willison encourages developers to see bad initial results as opportunities for refinement:

> "Remember it’s a conversation."
- Reed describes iterative workflows for improving existing codebases incrementally.

---

#### **7. Tools That Can Run Code in a Sandbox Are Highly Valuable**

- Willison praises tools like ChatGPT Code Interpreter and Claude Artifacts for safely running generated code in sandboxed environments.

---

#### **8. LLMs Amplify Existing Developer Expertise**

- Willison contends:

> "LLMs amplify existing expertise," relying heavily on his 25+ years of experience.
- Kießling agrees, stating senior developers are in the optimal position to harness LLM power due to their accumulated know-how.

---

#### **9. LLMs Can Assist with Understanding Existing Codebases**

- Willison describes using Gemini 2.0 Pro with his files-to-prompt tool to get an architectural overview of new projects.

---

#### **10. The Concept of "Cursor Rules" for Guiding LLM Behaviour**

- Huntley advocates building a "stdlib" of prompting rules, enabling greater control over outcomes:

> "Instead of approaching Cursor from the angle of 'implement XYZ of code,' you should instead be thinking of building out a 'stdlib'... composed like unix pipes."

---

#### **11. Managing Workflow and Potential Team Collaboration**

- Reed emphasizes planning steps to avoid losing control due to accelerated development pace.
- He also highlights the need for team-based coding solutions with LLMs.

---

#### **12. Addressing Skepticism and Potential Downsides**

- Reed acknowledges developer skepticism but recommends Ethan Mollick's book *Co-Intelligence* for a nuanced perspective.
- He also mentions concerns about AI's environmental impact due to power consumption.

---

### **Key Quotes**

- Simon Willison: *"Using LLMs to write code is difficult and unintuitive."*
- Simon Willison: *"Context is king."*
- Simon Willison: *"You have to test what it writes!"*
- Harper Reed: *"tl:dr; Brainstorm spec, then plan a plan, then execute using LLM codegen. Discrete loops. Then magic. ✩₊˚⋆☾⋆⁺₊✧"*
- Manuel Kießling: *"The very experience and accumulated know-how in software engineering and project management — which might seem obsolete in the age of AI — are precisely what enable the most effective use of these tools."*
- Geoffrey Huntley: *"You are using Cursor AI incorrectly..."*

---

### **Conclusion**

These sources collectively paint a picture of LLM-assisted coding as powerful yet challenging. Effective use requires strategic approaches that leverage developer expertise, focus on clear communication and context, and maintain rigorous testing practices. Huntley's concept of building a "stdlib" of rules represents an intriguing evolution in guiding LLM behavior. While current workflows often feel solitary, team-based AI-assisted development remains an area ripe for innovation.

Overall, these authors are optimistic about the potential of LLMs to enhance productivity and learning—provided developers approach them with realistic expectations and thoughtful integration strategies.

<div>⁂</div>


