# cosense-prompt-generator
RAG Prompt Generator using Cosense full-text search API
# Requirements
- you're using Cosense
- Deno 2.1.10 or later
# Usage
## Simple Usage
this command will search `browser` in project `villagepump` and generate RAG Prompt.
```sh
$ deno run rag.ts villagepump browser
```
this command will search `chat llm` in project `qualia-san` and generate RAG Prompt.
```sh
$ deno run rag.ts qualia-san "chat llm"
```
## Practical Usage
this command will search `browser` in project `villagepump` and generate RAG Prompt and ask to ollama llama3.2 model.
```sh
$ deno run rag.ts villagepump browser | ollama run llama3.2
```