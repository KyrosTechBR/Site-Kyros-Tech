import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { handleContactSubmission } from "@/services/contact-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Dados inválidos.", issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    await handleContactSubmission(parsed.data);

    return NextResponse.json({ message: "Contato recebido com sucesso." });
  } catch {
    return NextResponse.json({ message: "Não foi possível processar o contato." }, { status: 500 });
  }
}
