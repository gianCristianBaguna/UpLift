"use client";

import dynamic from "next/dynamic";

const Homepage = dynamic(() => import("@/app/pages/home/page"), { ssr: false });

export default function Home() {
  return <Homepage />;
}
