import type { NavLink, NavigationItem } from '@/exxonim/types';

export interface NavigationMenuColumn {
  title: string;
  items: NavLink[];
  borderLeft?: boolean;
}

function sortByOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((left, right) => left.order - right.order);
}

function dedupeNavLinks(links: NavLink[]) {
  const seen = new Set<string>();

  return links.filter((link) => {
    const key = `${link.href}::${link.label}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function getNavigationRoot(
  items: NavigationItem[],
  title: string
): NavigationItem | undefined {
  return items.find((item) => item.title === title);
}

export function getPrimaryLinks(items: NavigationItem[]) {
  return dedupeNavLinks(
    sortByOrder(
    items.filter((item) => item.kind === "primary" && !item.children.length)
  ).map((item) => ({
    label: item.title,
    href: item.url,
  })));
}

export function getNavigationColumns(root?: NavigationItem): NavigationMenuColumn[] {
  if (!root) {
    return [];
  }

  return sortByOrder(root.children).map((group, index) => ({
    title: group.title,
    borderLeft: index > 0,
    items: sortByOrder(group.children).map((item) => ({
      label: item.title,
      href: item.url,
    })),
  }));
}

export function findNavigationLinksByTitle(
  items: NavigationItem[],
  titles: string[]
) {
  const titleSet = new Set(titles);
  const matches: NavLink[] = [];

  const visit = (nodes: NavigationItem[]) => {
    for (const node of nodes) {
      if (titleSet.has(node.title)) {
        matches.push({
          label: node.title,
          href: node.url,
        });
      }

      if (node.children.length) {
        visit(node.children);
      }
    }
  };

  visit(items);
  return dedupeNavLinks(matches);
}
