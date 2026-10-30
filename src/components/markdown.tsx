import type { ReactNode } from "react";

type Block =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; code: string };

const inlinePattern = /(\*\*[^*]+?\*\*|`[^`]+`)/g;

export function Inline({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(inlinePattern)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const token = match[0];
    if (token.startsWith("`")) {
      nodes.push(
        <code
          key={index}
          className="rounded-[3px] bg-[#1a2130] px-1.5 py-px font-mono text-[0.88em] text-amber"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      nodes.push(
        <strong key={index} className="font-semibold text-ink">
          {token.slice(2, -2)}
        </strong>,
      );
    }
    last = index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

export function CodeBlock({ lang, code }: { lang: string; code: string }) {
  return (
    <div className="my-2.5 mb-4 overflow-hidden rounded border border-[#1e2531] bg-code">
      <div className="border-b border-[#1e2531] bg-[#0e121a] px-3 py-1.5 font-mono text-[10.5px] tracking-wide text-faint">
        {lang || "text"}
      </div>
      <pre className="overflow-x-auto px-4 py-3.5">
        <code className="font-mono text-[13px] leading-[1.65] whitespace-pre text-[#c8d0e0]">
          {code}
        </code>
      </pre>
    </div>
  );
}

function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || "text";
      const buf: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push({ type: "code", lang, code: buf.join("\n") });
      continue;
    }

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      i += 1;
      continue;
    }

    const heading = /^(#{2,4})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length as 2 | 3 | 4;
      blocks.push({ type: "heading", level, text: heading[2].trim() });
      i += 1;
      continue;
    }

    if (line.startsWith("* ") || line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].startsWith("* ") || lines[i].startsWith("- "))) {
        items.push(lines[i].slice(2));
        i += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const para = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("* ") &&
      !lines[i].startsWith("- ") &&
      !/^\d+\.\s/.test(lines[i])
    ) {
      para.push(lines[i]);
      i += 1;
    }
    blocks.push({ type: "p", text: para.join(" ") });
  }

  return blocks;
}

export function Markdown({ source }: { source: string }) {
  const blocks = parseMarkdown(source);
  return (
    <div className="text-[15px] leading-[1.75] text-dim [&>*:first-child]:mt-0">
      {blocks.map((block, index) => {
        if (block.type === "heading" && block.level === 2) {
          return (
            <h3
              key={index}
              className="mb-2.5 mt-[26px] font-display text-base font-semibold text-ink"
            >
              <Inline text={block.text} />
            </h3>
          );
        }
        if (block.type === "heading") {
          return (
            <h4
              key={index}
              className="mb-2 mt-[22px] font-display text-[14.5px] font-semibold text-violet"
            >
              <Inline text={block.text} />
            </h4>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="mb-3.5 list-disc pl-[22px]">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="mb-[5px]">
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={index} className="mb-3.5 list-decimal pl-[22px]">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="mb-[5px]">
                  <Inline text={item} />
                </li>
              ))}
            </ol>
          );
        }
        if (block.type === "code") {
          return <CodeBlock key={index} lang={block.lang} code={block.code} />;
        }
        return (
          <p key={index} className="mb-3">
            <Inline text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
