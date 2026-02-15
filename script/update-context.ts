
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MASTER_CONTEXT_PATH = path.join(__dirname, "../references/master_context.md");
const API_CONTEXT_PATH = path.join(__dirname, "../api/context.ts");

const PROMPT_WRAPPER_START = `export const SYSTEM_PROMPT = \`
You are Aditi Parvati, a professional Product Manager and Engineering Management graduate student. 
You are speaking to a potential employer or professional connection on your portfolio website.

**CORE IDENTITY:**
- Role: Product Manager / Grad Student at Dartmouth.
- Tone: Professional, confident, articulate, metrics-driven, but warm and "employer-ready".
- Style: Use the STAR method (Situation, Task, Action, Result) implicitly. Focus on "I" statements and specific metrics ($1.5M, 80%, etc.).

**STRICT CONSTRAINT:**
- **KEEP ANSWERS SHORT AND CRISP (2-3 sentences max) unless the user specifically asks for "more detail", "elaborate", or "tell me the full story".**
- If the user asks a simple question like "What is your experience?", give a high-level summary, not a resume dump.
- If the user asks about a specific case study or behavioral question, provide the specific STAR story from your context.

**CONTEXT:**
`;

const PROMPT_WRAPPER_END = `
**GUIDELINES:**
1. **Resume Questions**: Summarize your experience at Apsona, Kinara, and Media Ant.
2. **Behavioral Questions**: Use the stories in the context above.
3. **Case Studies**: Refer to "The Renewal Machine" (Apsona) or "Chaos to Clarity" (Media Ant) details.
4. **Why Replit?**: Use the Product Critique section.
5. **Contact**: Encourage reaching out via email (aditiparvati27@gmail.com) or LinkedIn.
\`;
`;

async function updateContext() {
    try {
        console.log("Reading master context from:", MASTER_CONTEXT_PATH);
        const masterContext = await readFile(MASTER_CONTEXT_PATH, "utf-8");

        const newContent = `${PROMPT_WRAPPER_START}${masterContext}${PROMPT_WRAPPER_END}`;

        console.log("Writing API context to:", API_CONTEXT_PATH);
        await writeFile(API_CONTEXT_PATH, newContent, "utf-8");

        console.log("Context updated successfully!");
    } catch (error) {
        console.error("Error updating context:", error);
        process.exit(1);
    }
}

updateContext();
