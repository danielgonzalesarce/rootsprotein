"use client";

import { useEffect } from "react";
import { useWriteReview } from "@/components/reviews/ReviewModal";

/** Abre el modal de reseña al llegar (útil para QR → /resena). */
export function OpenReviewOnMount() {
  const open = useWriteReview();

  useEffect(() => {
    const id = window.setTimeout(() => open(), 280);
    return () => window.clearTimeout(id);
  }, [open]);

  return null;
}
