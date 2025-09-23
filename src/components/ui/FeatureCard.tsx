import React from "react";
import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
};

const PRIMARY = "#D85151";

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  href,
}) => {
  const content = (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow h-full">
      <div
        className="w-14 h-14 rounded-lg flex items-center justify-center mb-5"
        style={{ backgroundColor: "#FEEAEA" }}
      >
        <Icon size={28} style={{ color: PRIMARY }} />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 text-lg">{title}</h3>
      <p className="text-base text-gray-600 leading-relaxed">{description}</p>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block h-full focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ outlineColor: PRIMARY }}
      >
        {content}
      </a>
    );
  }
  return content;
};

export default FeatureCard;
