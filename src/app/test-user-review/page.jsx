"use client";

import { Suspense } from "react";
import TestReviewForm from "./test-user-reviewContent";

const Loading = () => {
  return (
    <div className="min-h-screen bg-[#ede8e1]/60 flex items-center justify-center p-8">
      <div className="flex items-center gap-3 text-[#284e3a] font-semibold">
        <div className="w-5 h-5 border-2 border-[#284e3a]/20 border-t-[#284e3a] rounded-full animate-spin"></div>
        <span>Loading Tadoba Review Portal...</span>
      </div>
    </div>
  );
};

export default function TestUserReviewPage() {
  return (
    <Suspense fallback={<Loading />}>
      <TestReviewForm />
    </Suspense>
  );
}
