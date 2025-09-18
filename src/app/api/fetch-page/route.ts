// src/app/api/fetch-page/route.ts

export const runtime = "edge"; // ✅ App Router style

export async function GET() {
  try {
    const target = "https://lanes-ecommerce.vercel.app/";
    const target2 = "https://lanes-ecommerce.vercel.app/search";

    const res = await fetch(target, { method: "GET" });
    const res2 = await fetch(target2, { method: "GET" });

    const html1 = await res.text();
    const html2 = await res2.text();

    console.log(
      "cron: fetched",
      target,
      "len=",
      html1.length,
      "at",
      new Date().toISOString()
    );

    console.log(
      "cron: fetched",
      target2,
      "len=",
      html2.length,
      "at",
      new Date().toISOString()
    );

    return new Response(
      JSON.stringify({
        ok: true,
        pages: [
          { url: target, length: html1.length },
          { url: target2, length: html2.length }
        ],
        fetchedAt: new Date().toISOString()
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("cron error:", err);
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
