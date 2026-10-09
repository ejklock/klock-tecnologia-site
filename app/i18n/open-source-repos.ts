import { founderLinks } from "./site";

export const openSourceRepos = [
  "living-docs-skill",
  "claude-code-mode",
  "claude-mermaid-render",
  "claude-usage-mod",
  "claude-cache-statusline",
  "pi-claude-hooks",
  "jira-cli",
  "active-collab-cli",
  "docker-php-env-generate",
] as const;

export type RepoName = (typeof openSourceRepos)[number];

export function repoUrl(name: RepoName): string {
  return `${founderLinks.github}/${name}`;
}
