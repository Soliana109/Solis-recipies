import React from "react";

export default function CardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image" />
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-line--wide" />
        <div className="skeleton-line skeleton-line--narrow" />
      </div>
    </div>
  );
}
