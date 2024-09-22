"use client";

export const Button = ({ onClick, text, className }) => {
  return (
    <div>
      <button
        type={"submit"}
        onClick={onClick}
        className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}>
        {text}
      </button>
    </div>
  );
};
