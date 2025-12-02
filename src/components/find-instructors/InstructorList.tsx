import InstructorCard from "./InstructorCard";

interface Instructor {
  id: number;
  name: string;
  rating: number;
  specialty: string;
  price: number;
  tags: string[];
  imageUrl?: string;
}

interface InstructorListProps {
  instructors: Instructor[];
}

const InstructorList = ({ instructors }: InstructorListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {instructors.map((instructor) => (
        <InstructorCard key={instructor.id} {...instructor} />
      ))}
    </div>
  );
};

export default InstructorList;
