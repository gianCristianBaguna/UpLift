"use client";

import Image from "next/image";
import Shell from "@/components/navbar/shell";
import dynamic from "next/dynamic";

const Homepage = dynamic(() => import("@/app/pages/home/page"), { ssr: false });

export default function Home() {
  return <Homepage />;
}
