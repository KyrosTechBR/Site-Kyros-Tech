import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const lastModified = new Date("2026-07-22");

const routes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/solucoes", changeFrequency: "monthly", priority: 0.85 },
  { path: "/kyros-clock", changeFrequency: "monthly", priority: 0.85 },
  { path: "/agendabky", changeFrequency: "monthly", priority: 0.85 },
  { path: "/desenvolvimento-de-sites", changeFrequency: "monthly", priority: 0.8 },
  { path: "/automacao-de-processos", changeFrequency: "monthly", priority: 0.8 },
  { path: "/sobre", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contato", changeFrequency: "monthly", priority: 0.9 },
  { path: "/politica-de-privacidade", changeFrequency: "yearly", priority: 0.35 },
  { path: "/termos-de-uso", changeFrequency: "yearly", priority: 0.35 },
] satisfies Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
