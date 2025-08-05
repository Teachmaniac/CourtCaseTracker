"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { Order } from "@/lib/types";

export function DownloadOrderButton({ order }: { order: Order }) {
  const handleDownload = () => {
    const fileContent = `
Order Date: ${order.date}

Description:
${order.description}
`;
    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Order-${order.date}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button 
      size="sm" 
      style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}
      onClick={handleDownload}
    >
      <Download className="mr-2 h-4 w-4" />
      Download
    </Button>
  );
}
