import React, { useState } from 'react';
import { Upload, FileText, AlertTriangle } from 'lucide-react';
import { createChartFromCSV } from '../../services/csvService';

const CSVUploaderComponent = ({ onDataLoaded }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError(null);
      parseCSVPreview(selectedFile);
    } else {
      setFile(null);
      setError('Please select a valid CSV file');
      setPreview([]);
    }
  };

  const parseCSVPreview = (file) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        
        if (lines.length > 0) {
          const headers = lines[0].split(',').map(header => header.trim());
          const previewData = [];
          
          // Get up to 5 rows for preview
          for (let i = 1; i < Math.min(lines.length, 6); i++) {
            const rowData = lines[i].split(',').map(cell => cell.trim());
            if (rowData.length === headers.length) {
              const row = {};
              headers.forEach((header, index) => {
                row[header] = rowData[index];
              });
              previewData.push(row);
            }
          }
          
          setPreview(previewData);
        }
      } catch (error) {
        console.error('Error parsing CSV preview:', error);
        setError('Error parsing CSV file');
        setPreview([]);
      }
    };
    
    reader.onerror = () => {
      setError('Error reading the file');
      setPreview([]);
    };
    
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    if (!file) return;
    
    setIsLoading(true);
    
    try {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          const text = event.target.result;
          const chartConfigs = await createChartFromCSV(text);
          setIsLoading(false);
          
          if (onDataLoaded && chartConfigs) {
            onDataLoaded(chartConfigs);
          }
        } catch (error) {
          console.error('Error processing CSV:', error);
          setError('Error processing CSV: ' + error.message);
          setIsLoading(false);
        }
      };
      
      reader.onerror = () => {
        setError('Error reading the file');
        setIsLoading(false);
      };
      
      reader.readAsText(file);
    } catch (error) {
      console.error('Error handling file upload:', error);
      setError('Error uploading file');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mb-8">
      <h2 className="text-2xl font-semibold mb-6">CSV Data Visualization</h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Upload CSV File</h3>
          <p className="text-gray-500 mb-4">
            Upload a CSV file to generate visualizations for your security data
          </p>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700">
              <FileText className="mr-2" size={18} />
              Select CSV File
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            
            {file && (
              <span className="text-gray-600">{file.name}</span>
            )}
          </div>
          
          {error && (
            <div className="flex items-center mt-4 text-red-500">
              <AlertTriangle size={18} className="mr-2" />
              {error}
            </div>
          )}
        </div>
        
        {preview.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Preview</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    {Object.keys(preview[0]).map((header, index) => (
                      <th key={index} className="p-2 border text-left">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {Object.values(row).map((cell, cellIndex) => (
                        <td key={cellIndex} className="p-2 border">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <button
          onClick={handleSubmit}
          disabled={!file || isLoading}
          className={`flex items-center px-4 py-2 rounded-md ${
            !file || isLoading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Upload className="mr-2" size={18} />
              Visualize Data
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CSVUploaderComponent;