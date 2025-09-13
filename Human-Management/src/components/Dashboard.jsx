import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Plane, User, BarChart3 } from 'lucide-react';
import PersonnelForm from '../components/PersonnelForm';
import ResultsDisplay from '../components/ResultsDisplay';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [predictionResults, setPredictionResults] = useState(null);
  const [activeTab, setActiveTab] = useState('prediction');

  const handleLogout = () => {
    logout();
  };

  const handlePredictionResult = (results) => {
    setPredictionResults(results);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Plane className="h-8 w-8 text-iaf-blue mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  IAF Personnel Management
                </h1>
                <p className="text-sm text-gray-500">AI-Powered Insights</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-700">
                <User className="h-4 w-4 mr-2" />
                <span>{user?.name}</span>
                <span className="text-gray-500 ml-1">({user?.role})</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('prediction')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'prediction'
                  ? 'border-iaf-blue text-iaf-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <User className="inline h-4 w-4 mr-2" />
              Personnel Analysis
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-iaf-blue text-iaf-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="inline h-4 w-4 mr-2" />
              Workforce Analytics
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === 'prediction' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Personnel Prediction Tool
              </h2>
              <p className="text-gray-600">
                Enter personnel data to predict leadership potential and attrition risk using AI analysis.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div>
                <PersonnelForm onPredictionResult={handlePredictionResult} />
              </div>
              <div>
                {predictionResults ? (
                  <ResultsDisplay results={predictionResults} />
                ) : (
                  <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center h-full min-h-[400px]">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Ready for Analysis
                      </h3>
                      <p className="text-gray-500">
                        Fill out the personnel form and click "Analyze Personnel" to see AI-powered insights.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Workforce Analytics Dashboard
              </h2>
              <p className="text-gray-600">
                Comprehensive analytics and insights about IAF personnel.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Analytics Dashboard
                </h3>
                <p className="text-gray-500 mb-4">
                  Comprehensive workforce analytics will be displayed here.
                </p>
                <p className="text-sm text-gray-400">
                  Feature coming soon - Charts and visualizations based on dataset analysis
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;