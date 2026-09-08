import { createFileRoute } from "@tanstack/react-router";
import { TrackOrderForm } from "@/routes/auth";

export const Route = createFileRoute("/track-order")({
  head: () => ({
    meta: [
      { title: "Track your order — Sole Studio" },
      { name: "description", content: "Track your Sole Studio order without signing in." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TrackOrder,
});

function TrackOrder() {
  return (
    <div className="mx-auto max-w-xl px-5 py-16 md:px-10 md:py-24">
      <TrackOrderForm />
    </div>
  );
}
