export default function CourseCard({ course, onOpen }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-shadow">
      <h2 className="text-xl font-bold text-blue-800 mb-2">{course.title}</h2>
      <p className="text-gray-600 text-sm mb-4">{course.description}</p>
      <button 
        onClick={() => onOpen(course)}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        View Chapters
      </button>
    </div>
  );
}