import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, DollarSign } from 'lucide-react';
import api from '../../utils/api';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [paymentsRes, studentsRes] = await Promise.all([
        api.get('/admin/payments'),
        api.get('/admin/students')
      ]);
      setPayments(paymentsRes.data.payments || []);
      setStudents(studentsRes.data.students || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ studentName: '', course: '', amount: 0, paid: 0, due: 0, date: '', status: 'Pending' });

  const handleAdd = () => {
    setEditingPayment(null);
    setFormData({ studentName: '', course: '', amount: 0, paid: 0, due: 0, date: '', status: 'Pending' });
    setShowModal(true);
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setFormData(payment);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payment record?')) {
      setPayments(payments.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseInt(formData.amount);
    const paid = parseInt(formData.paid);
    const due = amount - paid;
    const status = due === 0 ? 'Paid' : paid > 0 ? 'Partial' : 'Pending';
    
    if (editingPayment) {
      setPayments(payments.map(p => p.id === editingPayment.id ? { ...formData, due, status, id: p.id } : p));
    } else {
      setPayments([...payments, { ...formData, due, status, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const filteredPayments = payments.filter(p => 
    p.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
        <button onClick={handleAdd} className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          <Plus className="w-5 h-5" />
          <span>Add Payment</span>
        </button>
      </div>

      <div className="card mb-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Student Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Course</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Paid</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Due</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">{payment.student?.name || 'N/A'}</td>
                <td className="py-3 px-4">{payment.student?.enrolledCourses?.[0]?.name || 'N/A'}</td>
                <td className="py-3 px-4">₹{payment.student?.totalFee?.toLocaleString() || 0}</td>
                <td className="py-3 px-4 text-green-600">₹{payment.amount?.toLocaleString() || 0}</td>
                <td className="py-3 px-4 text-red-600">₹{payment.student?.dueAmount?.toLocaleString() || 0}</td>
                <td className="py-3 px-4">{payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : 'N/A'}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    payment.status === 'completed' ? 'bg-green-100 text-green-700' : 
                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleEdit(payment)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(payment._id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{editingPayment ? 'Edit Payment' : 'Add Payment'}</h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <input
                type="text"
                placeholder="Student Name"
                value={formData.studentName}
                onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
              <input
                type="text"
                placeholder="Course"
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
              <input
                type="number"
                placeholder="Total Amount"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
              <input
                type="number"
                placeholder="Paid Amount"
                value={formData.paid}
                onChange={(e) => setFormData({...formData, paid: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
              <div className="flex space-x-2">
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                  {editingPayment ? 'Update' : 'Add'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
