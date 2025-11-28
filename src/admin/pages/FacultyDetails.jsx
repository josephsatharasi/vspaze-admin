import React from 'react';
import { ArrowLeft, BookOpen, Users, Award, Star } from 'lucide-react';

const FacultyDetails = ({ faculty, onBack }) => {
  const reviews = [
    { id: 1, student: 'John Doe', rating: 5, comment: 'Excellent teacher! Explains concepts very clearly and patiently.' },
    { id: 2, student: 'Sarah Wilson', rating: 5, comment: 'Best instructor I have had. Makes complex topics easy to understand.' },
    { id: 3, student: 'Mike Johnson', rating: 4, comment: 'Very knowledgeable and helpful. Great teaching methodology.' },
    { id: 4, student: 'Emily Davis', rating: 5, comment: 'Inspiring teacher who motivates students to learn more.' }
  ];

  return (
    <div>
      <button onClick={onBack} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Dashboard</span>
      </button>

      <div className="card mb-6 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">{faculty.name.split(' ').map(n => n[0]).join('')}</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{faculty.name}</h2>
            <p className="text-lg text-gray-600">{faculty.specialization}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-semibold text-gray-700">Rating: {faculty.rating}/5.0</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Courses</p>
              <p className="text-2xl font-bold text-gray-900">{faculty.courses}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Students</p>
              <p className="text-2xl font-bold text-gray-900">{faculty.students}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-gray-900">{faculty.rating}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Subjects Handled</h3>
        <div className="flex flex-wrap gap-2">
          {faculty.assignedCourses?.map((course, index) => (
            <span key={index} className="px-4 py-2 bg-gradient-to-br from-green-100 to-green-200 text-green-800 rounded-lg font-medium">
              {course}
            </span>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Student Reviews</h3>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{review.student}</h4>
                <div className="flex items-center space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyDetails;
