"use client"
import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Play } from 'lucide-react';

export default function DLScoreCalculator() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const calculateScores = async () => {
    setIsProcessing(true);
    setStatus('Starting DL Score calculation...');
    setProgress(0);
    setError('');
    setResults(null);

    try {
      const response = await fetch('/api/calculate-dl-scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          month: currentMonth,
          year: currentYear,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate scores');
      }

      setResults(data.results);
      setStatus('Calculation completed successfully!');
      setProgress(100);
    } catch (err) {
      setError(err.message || 'An error occurred');
      setStatus('Calculation failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">DL Score Calculator</h2>
            <p className="text-sm text-gray-600 mt-1">
              Calculate DL scores for {new Date().toLocaleString('default', { month: 'long' })} {currentYear}
            </p>
          </div>
          <button
            onClick={calculateScores}
            disabled={isProcessing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Calculate Scores
              </>
            )}
          </button>
        </div>

        {/* Status Message */}
        {status && (
          <div className={`flex items-start gap-3 p-4 rounded-lg mb-4 ${
            error 
              ? 'bg-red-50 border border-red-200' 
              : results 
              ? 'bg-green-50 border border-green-200'
              : 'bg-blue-50 border border-blue-200'
          }`}>
            {error ? (
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            ) : results ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <Loader2 className="w-5 h-5 text-blue-600 mt-0.5 animate-spin" />
            )}
            <div className="flex-1">
              <p className={`font-medium ${
                error 
                  ? 'text-red-900' 
                  : results 
                  ? 'text-green-900'
                  : 'text-blue-900'
              }`}>
                {status}
              </p>
              {error && (
                <p className="text-sm text-red-700 mt-1">{error}</p>
              )}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {isProcessing && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Processing categories...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Results Summary */}
        {results && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600 font-medium">Categories Processed</p>
                <p className="text-2xl font-bold text-blue-900">
                  {results.processedCategories} / {results.totalCategories}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600 font-medium">Products Processed</p>
                <p className="text-2xl font-bold text-green-900">
                  {results.processedProducts} / {results.totalProducts}
                </p>
              </div>
            </div>

            {results.errors && results.errors.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="font-medium text-yellow-900 mb-2">Warnings:</p>
                <ul className="list-disc list-inside space-y-1">
                  {results.errors.map((err, idx) => (
                    <li key={idx} className="text-sm text-yellow-800">{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">How it works:</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• Processes all products category by category</li>
            <li>• Calculates weighted activity counts</li>
            <li>• Computes percentiles within each category</li>
            <li>• Generates final DL scores (0-100)</li>
            <li>• Assigns performance bands (Top Performer, Strong Momentum, etc.)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}