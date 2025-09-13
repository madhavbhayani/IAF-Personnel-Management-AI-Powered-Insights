import React, { useState } from 'react';
import { personnelService } from '../services/api';
import { 
  User, 
  Star, 
  Award, 
  Target, 
  Heart, 
  Users, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const PersonnelForm = ({ onPredictionResult }) => {
  const [formData, setFormData] = useState({
    Age: 35,
    YearsOfService: 12,
    Rank: 'Squadron Leader',
    Specialization: 'Pilot',
    PerformanceRating: 4,
    TrainingCoursesCompleted: 9,
    MissionSuccessRate: 98.5,
    MedicalFitnessScore: 96,
    PeerReviewScore: 4.7,
    CommandersAssessment: 4.8
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ranks = [
    'Flying Officer',
    'Flight Lieutenant', 
    'Squadron Leader',
    'Wing Commander',
    'Group Captain'
  ];

  const specializations = [
    'Pilot',
    'Engineer', 
    'Admin',
    'Ground Staff',
    'Medical'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiData = {
        PersonnelID: 101,
        ...formData,
        AttritionRisk: 'Low' // Placeholder as required by API
      };

      const result = await personnelService.predictPersonnel(apiData);
      onPredictionResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <User className="h-6 w-6 text-iaf-blue mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Personnel Analysis Tool</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                Age: {formData.Age}
              </label>
              <input
                type="range"
                min="20"
                max="60"
                value={formData.Age}
                onChange={(e) => handleChange('Age', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>20</span>
                <span>60</span>
              </div>
            </div>

            {/* Years of Service */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Star className="inline h-4 w-4 mr-1" />
                Years of Service: {formData.YearsOfService}
              </label>
              <input
                type="range"
                min="1"
                max="40"
                value={formData.YearsOfService}
                onChange={(e) => handleChange('YearsOfService', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>40</span>
              </div>
            </div>

            {/* Rank */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Award className="inline h-4 w-4 mr-1" />
                Rank
              </label>
              <select
                value={formData.Rank}
                onChange={(e) => handleChange('Rank', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-iaf-blue focus:border-iaf-blue"
              >
                {ranks.map(rank => (
                  <option key={rank} value={rank}>{rank}</option>
                ))}
              </select>
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Target className="inline h-4 w-4 mr-1" />
                Specialization
              </label>
              <select
                value={formData.Specialization}
                onChange={(e) => handleChange('Specialization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-iaf-blue focus:border-iaf-blue"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            {/* Performance Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <TrendingUp className="inline h-4 w-4 mr-1" />
                Performance Rating: {formData.PerformanceRating}/5
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={formData.PerformanceRating}
                onChange={(e) => handleChange('PerformanceRating', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>5</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Training Courses */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Award className="inline h-4 w-4 mr-1" />
                Training Courses Completed: {formData.TrainingCoursesCompleted}
              </label>
              <input
                type="range"
                min="0"
                max="20"
                value={formData.TrainingCoursesCompleted}
                onChange={(e) => handleChange('TrainingCoursesCompleted', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>20</span>
              </div>
            </div>

            {/* Mission Success Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CheckCircle className="inline h-4 w-4 mr-1" />
                Mission Success Rate: {formData.MissionSuccessRate}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={formData.MissionSuccessRate}
                onChange={(e) => handleChange('MissionSuccessRate', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Medical Fitness */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Heart className="inline h-4 w-4 mr-1" />
                Medical Fitness Score: {formData.MedicalFitnessScore}/100
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.MedicalFitnessScore}
                onChange={(e) => handleChange('MedicalFitnessScore', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>100</span>
              </div>
            </div>

            {/* Peer Review Score */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline h-4 w-4 mr-1" />
                Peer Review Score: {formData.PeerReviewScore}/5
              </label>
              <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                value={formData.PeerReviewScore}
                onChange={(e) => handleChange('PeerReviewScore', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1.0</span>
                <span>5.0</span>
              </div>
            </div>

            {/* Commander's Assessment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Star className="inline h-4 w-4 mr-1" />
                Commander's Assessment: {formData.CommandersAssessment}/5
              </label>
              <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                value={formData.CommandersAssessment}
                onChange={(e) => handleChange('CommandersAssessment', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1.0</span>
                <span>5.0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-iaf-blue hover:bg-iaf-dark text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing Personnel...
              </>
            ) : (
              'Analyze Personnel'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonnelForm;