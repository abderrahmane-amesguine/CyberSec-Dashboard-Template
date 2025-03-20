import React, { useState } from 'react';

function SourcesComponent() {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Sources</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 quick-stats">
                {/* Sources widgets */}
                <div className="bg-white p-4 rounded-lg shadow stat-card">
                    <div className='stat-info'>
                        <h3 className="text-lg font-medium">Total Sources</h3>
                        <p className="text-2xl font-bold">12</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow stat-card">
                    <div className='stat-info'>
                        <h3 className="text-lg font-medium">Active Sources</h3>
                        <p className="text-2xl font-bold">8</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow stat-card">
                    <div className='stat-info'>
                        <h3 className="text-lg font-medium">Inactive Sources</h3>
                        <p className="text-2xl font-bold">4</p>
                    </div>
                </div>
            </div>

            {/* Additional sources content */}
            <div className="mt-6 bg-white p-4 rounded-lg shadow recent-alerts">
                <h2 className="text-lg font-medium mb-4">Source List</h2>
                <div className="alerts-list" id="alertsList">
                    {/* Source content */}
                </div>
            </div>
        </div>
    );
}

export default SourcesComponent;