import { FileUpload } from "./components/ui/file-upload";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-8 md:p-20 gap-6 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      {/* Main content */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-6xl mx-auto gap-8">
        {/* Introduction */}
        <div className="flex flex-col md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-800">
            CORESTATE
          </h1>
          <p className="mt-2 text-lg text-neutral-600">
            Health Data Centralization
          </p>
          <p className="mt-1 text-base text-neutral-500">
            Start with lab reports or/and a Garmin
          </p>
        </div>
        {/* File Upload Component */}
        <div className="md:w-1/2 w-full">
          <FileUpload />
        </div>
      </div>
    </div>
  );
}
