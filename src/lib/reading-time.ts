import { Block, Inline, MARKS, Text } from "@contentful/rich-text-types";
import { PostContent } from "@jogo/definitions";

const WORDS_PER_MINUTE = 200;

const countWords = (node: Block | Inline | Text): number => {
  if ("value" in node) {
    // CODE-marked text is the raw HTML embed mechanism (videos, social posts),
    // not readable words
    if (node.marks.some((mark) => mark.type === MARKS.CODE)) return 0;
    return node.value.split(/\s+/).filter(Boolean).length;
  }
  return node.content.reduce((sum, child) => sum + countWords(child), 0);
};

export const getReadingTimeMinutes = (
  json: PostContent["json"],
  lead?: string,
): number => {
  const bodyWords = json.content.reduce((sum, node) => sum + countWords(node), 0);
  const leadWords = lead ? lead.split(/\s+/).filter(Boolean).length : 0;
  return Math.max(1, Math.round((bodyWords + leadWords) / WORDS_PER_MINUTE));
};

export const formatReadingTime = (minutes: number): string =>
  minutes === 1 ? "1 λεπτό ανάγνωσης" : `${minutes} λεπτά ανάγνωσης`;
