import React, { useState, useEffect } from 'react';
import { Edit3, Save, X, MessageSquare, Calendar, User, Mail, Building } from 'lucide-react';

const QuestionPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editAnswer, setEditAnswer] = useState('');
  const [filter, setFilter] = useState('all'); // all, answered, unanswered
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions');
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
    setLoading(false);
  };

  const handleEditClick = (question) => {
    setEditingId(question.id);
    setEditAnswer(question.answer || '');
  };

  const handleSaveAnswer = async (questionId) => {
    setSaving(true);
    try {
      const response = await fetch('/api/questions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: questionId,
          answer: editAnswer
        }),
      });

      if (response.ok) {
        // Update local state
        setQuestions(questions.map(q => 
          q.id === questionId ? { ...q, answer: editAnswer } : q
        ));
        setEditingId(null);
        setEditAnswer('');
      } else {
        alert('Error saving answer');
      }
    } catch (error) {
      console.error('Error saving answer:', error);
      alert('Error saving answer');
    }
    setSaving(false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditAnswer('');
  };

  const filteredQuestions = questions.filter(question => {
    if (filter === 'answered') return question.answer;
    if (filter === 'unanswered') return !question.answer;
    return true;
  });

  const getStatusBadge = (question) => {
    if (question.answer) {
      return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Answered</span>;
    }
    return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Pending</span>;
  };

  const getPurposeBadge = (purpose) => {
    const colors = {
      'Buying software': 'bg-blue-100 text-blue-800',
      'Market research': 'bg-purple-100 text-purple-800',
      'Just information': 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[purpose] || 'bg-gray-100 text-gray-800'}`}>
        {purpose}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
        <div className="text-[#1e2556] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Header */}
      <div className="bg-[#1e2556] text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Admin Panel - Software Q&A</h1>
          <p className="text-[#7cc6ee] mt-2">Manage questions and provide expert answers</p>
        </div>
      </div>

      {/* Stats and Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-[#1e2556]">{questions.length}</div>
            <div className="text-[#334155]">Total Questions</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">{questions.filter(q => q.answer).length}</div>
            <div className="text-[#334155]">Answered</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">{questions.filter(q => !q.answer).length}</div>
            <div className="text-[#334155]">Pending</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-[#7cc6ee]">
              {questions.length > 0 ? Math.round((questions.filter(q => q.answer).length / questions.length) * 100) : 0}%
            </div>
            <div className="text-[#334155]">Response Rate</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all' ? 'bg-[#1e2556] text-white' : 'bg-white text-[#334155] hover:bg-gray-50'
            }`}
          >
            All Questions ({questions.length})
          </button>
          <button
            onClick={() => setFilter('unanswered')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'unanswered' ? 'bg-[#1e2556] text-white' : 'bg-white text-[#334155] hover:bg-gray-50'
            }`}
          >
            Pending ({questions.filter(q => !q.answer).length})
          </button>
          <button
            onClick={() => setFilter('answered')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'answered' ? 'bg-[#1e2556] text-white' : 'bg-white text-[#334155] hover:bg-gray-50'
            }`}
          >
            Answered ({questions.filter(q => q.answer).length})
          </button>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.map((question) => (
            <div key={question.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Question Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      {getStatusBadge(question)}
                      {getPurposeBadge(question.purpose)}
                    </div>
                    <h3 className="text-lg font-semibold text-[#1e2556] mb-2">{question.question}</h3>
                  </div>
                </div>

                {/* User Details */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-[#334155]">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{question.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{question.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>{question.description}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(question.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Answer Section */}
              <div className="p-6">
                {editingId === question.id ? (
                  <div className="space-y-4">
                    <label className="block text-[#334155] font-medium">Expert Answer:</label>
                    <textarea
                      value={editAnswer}
                      onChange={(e) => setEditAnswer(e.target.value)}
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent resize-none text-[#2d2d2d]"
                      placeholder="Provide a detailed, helpful answer..."
                    />
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleSaveAnswer(question.id)}
                        disabled={saving || !editAnswer.trim()}
                        className="flex items-center space-x-2 bg-[#1e2556] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Saving...' : 'Save Answer'}</span>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {question.answer ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-[#1e2556]">Expert Answer:</h4>
                          <button
                            onClick={() => handleEditClick(question)}
                            className="flex items-center space-x-2 text-[#7cc6ee] hover:text-[#1e2556] transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                        </div>
                        <div className="bg-[#f5f7fa] p-4 rounded-lg border-l-4 border-[#7cc6ee]">
                          <p className="text-[#2d2d2d] leading-relaxed whitespace-pre-wrap">{question.answer}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-[#334155] mb-4">No answer provided yet</p>
                        <button
                          onClick={() => handleEditClick(question)}
                          className="flex items-center space-x-2 bg-[#7cc6ee] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors mx-auto"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span>Add Answer</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#334155] mb-2">No questions found</h3>
              <p className="text-[#334155]">
                {filter === 'all' 
                  ? 'No questions have been submitted yet.' 
                  : filter === 'answered' 
                    ? 'No questions have been answered yet.'
                    : 'No pending questions found.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionPanel;