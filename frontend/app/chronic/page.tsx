"use client";
import { useState } from "react";

export default function AcuteHealth() {
  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Lab Report</h1>

      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        // disabled={!file}
      >
        Upload & Analyze
      </button>
    </main>
  );
}
