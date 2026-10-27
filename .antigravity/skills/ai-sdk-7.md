# Vercel AI SDK 7 Engineering Standards (2026 Edition)

## Core Syntax Rules
1. **Instructions Directive:**
   - Always use `instructions: string` (NEVER `system: string`).
2. **Structured Output:**
   - Always use `output: Output.object({ schema: ZodSchema })` inside `streamText` or `generateText`.
   - NEVER use deprecated `experimental_output` or `generateObject`.
3. **Completion & Stream Hooks:**
   - Always use `onEnd` (NEVER `onFinish`).
   - Always use `stream` property (NEVER `fullStream`).
4. **Stream Response Formatters:**
   - Use top-level `createUIMessageStreamResponse` or `createTextStreamResponse` for HTTP streaming route handlers.
5. **Models:**
   - Complex reasoning, multi-phase roadmap synthesis, and executive reports: Google Gemini 3.1 Pro (`google('gemini-3.1-pro')`).
   - Rapid task breakdown, story point estimation, and subtask generation: Google Gemini 3.6 Flash (`google('gemini-3.6-flash')`).
6. **Tool Approvals:**
   - State-altering operations must implement explicit user confirmation or HITL token validation before database writes.
