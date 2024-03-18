import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

export default function Accordion(props: { title: string; content: React.ReactNode }) {
  const { title, content } = props;
  const [accordionOpen, setaccordionOpen] = useState<boolean>(false);
  return (
    <div className="p-3 border-gray-200 border-2 rounded-xl mb-2">
      <button
        className={`flex w-full justify-between font-medium transition-all duration-300 ${accordionOpen ? 'p-3 border-b' : 'p-0'} `}
        onClick={() => setaccordionOpen(!accordionOpen)}
      >
        <span>{title}</span>
        <span>
          {accordionOpen ? (
            <FontAwesomeIcon icon="arrow-up" />
          ) : (
            <FontAwesomeIcon icon="arrow-down" />
          )}
        </span>
      </button>
      <div
        className={`grid overflow-hidden text-slate-600 transition-all duration-300 ease-in-out ${
          accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden"> {content}</div>
      </div>
    </div>
  );
}
