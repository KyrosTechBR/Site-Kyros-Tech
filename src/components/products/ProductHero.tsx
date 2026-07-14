import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ProductMockup } from "@/components/products/ProductMockup";

export function ProductHero({
  name,
  subtitle,
  description,
  cta,
  ctaHref = "/contato",
  ctaVariant = "primary",
  mockup,
}: {
  name: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaHref?: string;
  ctaVariant?: "primary" | "secondary" | "ghost";
  mockup: "work" | "agenda";
}) {
  return (
    <section className="pt-32 pb-16">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Badge>{name}</Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-normal text-white sm:text-5xl">{subtitle}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{description}</p>
          <div className="mt-8">
            <LinkButton href={ctaHref} variant={ctaVariant}>
              {cta} <ArrowRight className="size-4" aria-hidden="true" />
            </LinkButton>
          </div>
        </div>
        <ProductMockup variant={mockup} />
      </Container>
    </section>
  );
}
