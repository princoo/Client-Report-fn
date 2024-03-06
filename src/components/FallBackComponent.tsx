import { FallbackProps } from 'react-error-boundary';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import serverError from '/svgs/serverError.svg';
// type Props = {
//   code: string;
//   // Add any additional props specific to your component
// };

const FallBackComponent: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className=" flex flex-col justify-center items-center mt-5 gap-2">
      <img src={serverError} alt="svg" className="w-1/3" />
      <p className="text-lg font-medium">Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary} className="bg-blue-600 text-white px-2 rounded-xl">
        <FontAwesomeIcon icon="refresh" className="mr-2" />
        Try again
      </button>
    </div>
  );
};

export default FallBackComponent;
