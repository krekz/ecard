"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const FaqsCard = (props: any) => {
  const answerElRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState("0px");
  const { faqsList, idx } = props;
  const handleOpenAnswer = () => {
    const answerElH = (answerElRef.current?.childNodes[0] as HTMLElement)
      ?.offsetHeight;
    setState(!state);
    setAnswerH(`${answerElH + 20}px`);
  };

  return (
    <div
      className="space-y-3 mt-5 overflow-hidden border-b"
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-700 font-medium">
        {faqsList.q}
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={state ? { height: answerH } : { height: "0px" }}
      >
        <div>
          <p className="text-gray-500">{faqsList.a}</p>
        </div>
      </div>
    </div>
  );
};

export const Faq = () => {
  const faqsList = [
    {
      q: "How much does a digital wedding card cost?",
      a: "Our digital wedding cards are available at a one-time cost of RM9.90 per card. There are no subscription fees or hidden charges.",
    },
    {
      q: "Can I make changes to my digital card after purchasing it?",
      a: "Yes, you can change the design of your digital card anytime after purchasing it, up until your wedding date. After the wedding date has passed, you will no longer be able to make edits to your card.",
    },
    {
      q: "Can I still preview my card after the wedding date has passed?",
      a: "Yes, you can still preview your digital wedding card after the wedding date has passed, but you will no longer be able to make any edits or changes to it.",
    },
    {
      q: "Can I get a refund if I change my mind after purchasing the card?",
      a: "Unfortunately, we do not offer refunds once a card has been purchased, as it is a digital product that can be customized and used immediately.",
    },
    {
      q: " How will I receive my digital wedding card?",
      a: "After completing your purchase, you will receive a link to access and edit your digital card. This link can be used to share your card with guests directly.",
    },
  ];

  return (
    <motion.section
      id="faq"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.5, once: true }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="leading-relaxed max-w-screen-xl mt-12 mx-auto p-8"
    >
      <div className="space-y-3 text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto text-lg">
          Here you&apos;ll find answers to common questions about our digital
          wedding cards.
        </p>
      </div>
      <div className="mt-14 max-w-2xl mx-auto">
        {faqsList.map((item, idx) => (
          <FaqsCard key={idx} idx={idx} faqsList={item} />
        ))}
      </div>
    </motion.section>
  );
};
