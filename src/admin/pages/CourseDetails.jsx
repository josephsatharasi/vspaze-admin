import React from 'react';
import { ArrowLeft, Users, Calendar, Award, DollarSign, Star } from 'lucide-react';

const CourseDetails = ({ course, onBack }) => {
  const testimonials = [
    { id: 1, student: 'John Doe', batch: 'Batch A-2024', rating: 5, comment: 'Excellent course! The curriculum is well-structured and covers all essential topics.' },
    { id: 2, student: 'Sarah Wilson', batch: 'Batch A-2024', rating: 5, comment: 'Best learning experience. Practical projects helped me understand concepts better.' },
    { id: 3, student: 'Mike Johnson', batch: 'Batch A-2023', rating: 4, comment: 'Great course content. Would recommend to anyone starting their career.' }
  ];

  return (
    <div>
      <button onClick={onBack} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Dashboard</span>
      </button>

      <div className="card mb-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{course.name}</h2>
        <div className="flex items-center space-x-2 mb-6">
          <Award className="w-5 h-5 text-yellow-500" />
          <span className="text-lg font-semibold text-gray-700">Rating: {course.rating}/5.0</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Students</p>
              <p className="text-2xl font-bold text-gray-900">{course.students}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Batches</p>
              <p className="text-2xl font-bold text-gray-900">{course.batches}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <DollarSign className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{course.revenue}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-gray-900">{course.rating}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Student Testimonials</h3>
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.student}</h4>
                  <p className="text-sm text-gray-600">{testimonial.batch}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm italic">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
