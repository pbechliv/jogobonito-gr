import { Tag } from "@jogo/definitions";
import { MAIN_TAG_NAMES_SORTED } from "./main-tag-names-sorted";

export function sortAndPartitionTags(tags: Tag[]): {
  mainTags: Tag[];
  secondaryTags: Tag[];
} {
  const tagOrder = new Map<string, number>(
    MAIN_TAG_NAMES_SORTED.map((name, index) => [name, index])
  );

  const mainTags = tags
    .filter((tag) => tag.isMain)
    .sort(
      (a, b) =>
        (tagOrder.get(a.name) ?? Number.POSITIVE_INFINITY) -
        (tagOrder.get(b.name) ?? Number.POSITIVE_INFINITY)
    );

  const secondaryTags = tags
    .filter((tag) => !tag.isMain)
    .sort((a, b) => a.name.localeCompare(b.name, "el"));

  return { mainTags, secondaryTags };
}

export function sortTagsMainFirst(tags: Tag[]): Tag[] {
  const { mainTags, secondaryTags } = sortAndPartitionTags(tags);
  return [...mainTags, ...secondaryTags];
}
