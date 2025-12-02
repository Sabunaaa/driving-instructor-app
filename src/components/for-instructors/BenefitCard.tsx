import { LucideIcon } from "lucide-react";

interface BenefitCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const BenefitCard = ({ title, description, icon: Icon }: BenefitCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#F03D3D]/30 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group flex flex-col h-full">
      <div className="w-12 h-12 rounded-xl bg-[#F03D3D]/10 flex items-center justify-center mb-4 group-hover:bg-[#F03D3D] transition-colors duration-300">
        <Icon className="w-6 h-6 text-[#F03D3D] group-hover:text-white transition-colors duration-300" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#F03D3D] transition-colors">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
};

export default BenefitCard;
