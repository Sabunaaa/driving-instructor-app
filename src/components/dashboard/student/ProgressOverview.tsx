import React from "react";
import { CheckCircle2, Lock, Circle } from "lucide-react";

const skills = [
  { name: "Vehicle Controls", progress: 100, status: "completed" },
  { name: "Moving Off & Stopping", progress: 100, status: "completed" },
  { name: "Junctions & Roundabouts", progress: 60, status: "in-progress" },
  { name: "Parking Maneuvers", progress: 30, status: "in-progress" },
  { name: "Highway Driving", progress: 0, status: "locked" },
  { name: "Emergency Stop", progress: 0, status: "locked" },
];

export const ProgressOverview = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Learning Progress</h3>
        <span className="text-sm text-gray-500">48% Completed</span>
      </div>

      <div className="space-y-4">
        {skills.map((skill, idx) => (
          <div key={idx} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {skill.status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : skill.status === "locked" ? (
                  <Lock className="w-5 h-5 text-gray-300" />
                ) : (
                  <Circle className="w-5 h-5 text-[#F03D3D]" />
                )}
                <span className={`font-medium ${skill.status === "locked" ? "text-gray-400" : "text-gray-700"}`}>
                  {skill.name}
                </span>
              </div>
              <span className="text-sm text-gray-500">{skill.progress}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  skill.status === "completed" ? "bg-green-500" : 
                  skill.status === "locked" ? "bg-gray-200" : "bg-[#F03D3D]"
                }`}
                style={{ width: `${skill.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
