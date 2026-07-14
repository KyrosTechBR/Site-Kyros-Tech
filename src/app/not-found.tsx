import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-36">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Erro 404</p>
        <h1 className="mt-4 text-4xl font-bold text-white">Página não encontrada</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          O endereço acessado não existe ou pode ter sido alterado. Volte para a página inicial e continue navegando.
        </p>
        <Link className="mt-8 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white" href="/">
          Voltar para o inicio
        </Link>
      </Container>
    </section>
  );
}
