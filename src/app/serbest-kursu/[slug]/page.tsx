"use client";

import { use } from "react";
import { SerbestKursuDetailView } from "@/views/serbest-kursu-detail";

export default function SerbestKursuDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <SerbestKursuDetailView slug={slug} />;
}
