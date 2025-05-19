import React from "react";

interface CustomFloatingCardProps {
  icon?: React.ReactNode; // Prop for the icon element
  title: string; // Prop for the title text
  subtitle: string; // Prop for the subtitle text
  className?: string; // Add className prop
}

const CustomFloatingCard: React.FC<CustomFloatingCardProps> = ({
  icon,
  title,
  subtitle,
  className, // Receive className prop
}) => {
  return (
    <div
      className={`shadow-lg rounded-xl p-6 bg-white w-60 flex flex-col items-center text-center ${className}`}
    >
      <div className="mb-3">
        {/* Container for the icon */}
        {icon ? (
          <div className="flex justify-center items-center w-18 h-18 text-5xl">
            {icon}
          </div>
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl text-gray-600">
            ?
          </div>
        )}
      </div>
      {/* Title */}
      <h3 className=" font-semibold mb-1 font-instrument-serif text-xl">
        {title}
      </h3>
      {/* Subtitle (e.g., supporters/likes) */}
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
};

export default CustomFloatingCard;
