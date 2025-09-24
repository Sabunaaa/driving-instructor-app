import React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import Card from "./Card";

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
    <Card padding="lg" interactive>
      <div
        className="w-14 h-14 rounded-lg flex items-center justify-center mb-5"
        style={{ backgroundColor: "#FEEAEA" }}
      >
        <Icon size={28} style={{ color: PRIMARY }} />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 text-lg">{title}</h3>
      <p className="text-base text-gray-600 leading-relaxed">{description}</p>
    </Card>
  );

  if (href) {
    const isExternal =
      /^(https?:)?\/\//.test(href) ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }
  return content;
};

export default FeatureCard;
