import { faqData } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import React from "react";

const FAQ = () => {
  return (
    <section id="testimonies" className="py-10 ">
      <div className="max-w-6xl mx-5 md:mx-10 lg:mx-20 xl:mx-auto">
        <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
          <div className="mb-12 space-y-5 md:mb-16 text-center">
            <div className="inline-block px-3 py-1 text-sm font-semibold bg-accent text-white rounded-lg md:text-center bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
              Quick Help
            </div>
            <h1 className="mb-5 text-3xl font-bold md:text-center md:text-5xl">
              Frequesntly Asked Questions
            </h1>
            <p className="text-xl md:text-center md:text-2xl">
              We've got answers to help you get started.
            </p>
          </div>
        </div>

        <div>
          <ul className="mt-10 divide-y shadow shadow-accent rounded-xl">
            {faqData?.map((faq) => (
              <li key={faq.id}>
                <details className="group">
                  <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                    <ChevronRight className="group-open:rotate-90 trans" />
                    <span>{faq.question}</span>
                  </summary>

                  <article className="px-4 pb-4">
                    <p>{faq.answer}</p>
                  </article>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
