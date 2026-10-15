import {
  Atom,
  Braces,
  Coffee,
  Code2,
  Database,
  Hexagon,
  SquareCode,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'languages'
  icon: LucideIcon
  filename: string
  code: string
}

export const skills: Skill[] = [
  {
    name: 'React',
    category: 'frontend',
    icon: Atom,
    filename: 'Hello.jsx',
    code: `const Hello = () => <h1>Hello, I'm tenzaspany</h1>;`,
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    icon: SquareCode,
    filename: 'index.ts',
    code: `const nick: string = "tenzaspany";\nconsole.log(\`Hello, I'm \${nick}\`);`,
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    icon: Braces,
    filename: 'index.js',
    code: `console.log("Hello, I'm tenzaspany");`,
  },
  {
    name: 'Node.js',
    category: 'backend',
    icon: Hexagon,
    filename: 'server.js',
    code: `process.stdout.write("Hello, I'm tenzaspany\\n");`,
  },
  {
    name: 'SQL',
    category: 'backend',
    icon: Database,
    filename: 'hello.sql',
    code: `SELECT 'Hello, I''m tenzaspany' AS message;`,
  },
  {
    name: 'Java',
    category: 'languages',
    icon: Coffee,
    filename: 'Main.java',
    code: `System.out.println("Hello, I'm tenzaspany");`,
  },
  {
    name: 'Python',
    category: 'languages',
    icon: Code2,
    filename: 'main.py',
    code: `print("Hello, I'm tenzaspany")`,
  },
]
