import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Star,
  Shield,
  Target,
  Award,
  Users
} from 'lucide-react';

const ResultsDisplay = ({ results }) => {
  if (!results) return null;

  const getLeadershipDetails = (potential) => {
    switch (potential.toLowerCase()) {
      case 'high':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: <Star className="h-8 w-8 text-green-600" />,
          title: 'High Leadership Potential',
          description: 'This personnel demonstrates exceptional leadership qualities and is ready for advanced responsibilities.',
          recommendations: [
            'Consider for promotion to higher ranks',
            'Assign to leadership development programs',
            'Mentor junior personnel',
            'Lead critical missions and projects'
          ]
        };
      case 'medium':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          icon: <TrendingUp className="h-8 w-8 text-yellow-600" />,
          title: 'Medium Leadership Potential',
          description: 'Shows good leadership abilities with room for growth and development.',
          recommendations: [
            'Provide additional leadership training',
            'Assign as deputy in team projects',
            'Encourage participation in command exercises',
            'Monitor progress for future advancement'
          ]
        };
      case 'low':
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          icon: <Target className="h-8 w-8 text-blue-600" />,
          title: 'Developing Leadership Potential',
          description: 'Currently focused on technical excellence with potential for leadership development.',
          recommendations: [
            'Focus on technical skill enhancement',
            'Provide foundational leadership training',
            'Assign to cross-functional teams',
            'Develop communication and interpersonal skills'
          ]
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: <Users className="h-8 w-8 text-gray-600" />,
          title: 'Assessment Pending',
          description: 'Further evaluation needed to determine leadership potential.',
          recommendations: ['Conduct additional assessments']
        };
    }
  };

  const getAttritionDetails = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: <CheckCircle className="h-8 w-8 text-green-600" />,
          title: 'Low Attrition Risk',
          description: 'Highly engaged and committed personnel with strong retention likelihood.',
          factors: [
            'High job satisfaction and engagement',
            'Strong performance metrics',
            'Good career progression prospects',
            'Positive peer and commander relationships'
          ]
        };
      case 'medium':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          icon: <Shield className="h-8 w-8 text-yellow-600" />,
          title: 'Medium Attrition Risk',
          description: 'Moderate retention risk requiring attention to engagement and development.',
          factors: [
            'Monitor job satisfaction levels',
            'Provide career development opportunities',
            'Address any performance concerns',
            'Enhance peer support and mentoring'
          ]
        };
      case 'high':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: <AlertTriangle className="h-8 w-8 text-red-600" />,
          title: 'High Attrition Risk',
          description: 'Immediate attention required to address retention concerns and re-engage personnel.',
          factors: [
            'Conduct immediate retention interview',
            'Address performance and satisfaction issues',
            'Consider role reassignment or additional training',
            'Implement personalized retention strategies'
          ]
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: <Users className="h-8 w-8 text-gray-600" />,
          title: 'Assessment Pending',
          description: 'Further analysis needed to determine attrition risk.',
          factors: ['Conduct comprehensive evaluation']
        };
    }
  };

  const leadershipInfo = getLeadershipDetails(results.leadership_potential);
  const attritionInfo = getAttritionDetails(results.attrition_risk);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Complete</h2>
        <p className="text-gray-600">AI-powered insights for personnel management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leadership Potential Card */}
        <div className={`${leadershipInfo.bgColor} ${leadershipInfo.borderColor} border rounded-lg p-6`}>
          <div className="flex items-center mb-4">
            {leadershipInfo.icon}
            <div className="ml-3">
              <h3 className={`text-lg font-semibold ${leadershipInfo.color}`}>
                {leadershipInfo.title}
              </h3>
              <p className="text-sm text-gray-600">Leadership Assessment</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">{leadershipInfo.description}</p>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Recommendations:</h4>
            <ul className="space-y-1">
              {leadershipInfo.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <Award className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Attrition Risk Card */}
        <div className={`${attritionInfo.bgColor} ${attritionInfo.borderColor} border rounded-lg p-6`}>
          <div className="flex items-center mb-4">
            {attritionInfo.icon}
            <div className="ml-3">
              <h3 className={`text-lg font-semibold ${attritionInfo.color}`}>
                {attritionInfo.title}
              </h3>
              <p className="text-sm text-gray-600">Retention Analysis</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">{attritionInfo.description}</p>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Action Items:</h4>
            <ul className="space-y-1">
              {attritionInfo.factors.map((factor, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-iaf-blue bg-opacity-5 border border-iaf-blue border-opacity-20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-iaf-dark mb-3">Analysis Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-iaf-blue mr-2" />
            <span className="text-sm text-gray-700">
              <strong>Leadership:</strong> {results.leadership_potential}
            </span>
          </div>
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-iaf-blue mr-2" />
            <span className="text-sm text-gray-700">
              <strong>Retention:</strong> {results.attrition_risk} Risk
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          This analysis is based on AI models trained on IAF personnel data. Use these insights 
          as part of a comprehensive evaluation process.
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;