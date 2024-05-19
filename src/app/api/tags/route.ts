export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const OLLAMA_URL = process.env.NEXT_PUBLIC_OLLAMA_URL;
  const res = await fetch(
    OLLAMA_URL + "/api/tags"
  );
  return new Response(res.body, res);
}
