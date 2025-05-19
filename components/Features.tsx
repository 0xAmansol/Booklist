import React from "react";

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-emerald-500 flex-shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const Features = () => {
  return (
    <section className="w-full py-16 bg-gray-50 flex flex-col items-center px-8">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-instrument-serif">
        Designed for <i className="text-emerald-500">readers</i>,
        <br className="sm:hidden" /> not just for <i>lists</i>.
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-3">
            <div className="rounded-full border border-gray-300 p-1 flex-shrink-0">
              <CheckIcon />
            </div>
            <p className="text-gray-700 text-lg">
              We don&apos;t just show you lists. We help you find your next
              <span className="font-semibold"> favorite book</span>.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-full border border-gray-300 p-1 flex-shrink-0">
              <CheckIcon />
            </div>
            <p className="text-gray-700 text-lg">
              You get to <span className="font-semibold">discuss books</span>{" "}
              with other readers and share your thoughts.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-3">
            <div className="rounded-full border border-gray-300 p-1 flex-shrink-0">
              <CheckIcon />
            </div>
            <p className="text-gray-700 text-lg">
              You have <span className="font-semibold">100% ownership</span> of
              your reading journey. No hidden algorithms, just great books.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-full border border-gray-300 p-1 flex-shrink-0">
              <CheckIcon />
            </div>
            <p className="text-gray-700 text-lg">
              Get personalized recommendations instantly.{" "}
              <span className="font-semibold">No more endless searching</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
