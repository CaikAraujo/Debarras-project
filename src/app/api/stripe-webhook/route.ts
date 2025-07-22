// Rota temporariamente desativada para evitar erro de build na Vercel
export async function POST(req: Request) {
  return new Response('Stripe webhook desativado temporariamente', { status: 200 });
} 