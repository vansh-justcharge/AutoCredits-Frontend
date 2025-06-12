import React from 'react';
import MetricCard from '../MetricCard';
import BarChart from '../charts/BarChart';

const insuranceChartData = [
  { name: 'Total', value: 30 },
  { name: 'Approved', value: 25 },
  { name: 'In Review', value: 20 },
  { name: 'Completed', value: 15 },
  { name: 'Pending', value: 12 },
  { name: 'Rejected', value: 8 },
];

const loanChartData = [
  { name: 'Jul', value: 80 },
  { name: 'Apr', value: 110 },
  { name: 'Aug', value: 150 },
  { name: 'Sep', value: 180 },
  { name: 'May', value: 250 },
  { name: 'Jun', value: 300 },
];

const OverviewTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Leads"
          value="1,234"
          percentChange="+5%"
          currency="₹"
        />
        <MetricCard
          title="Sales Performance"
          value="56,789"
          percentChange="+12%"
          currency="₹"
        />
        <MetricCard
          title="Loan Approvals"
          value="345"
          percentChange="+2%"
          currency="₹"
        />
        <MetricCard
          title="Insurance Status"
          value="Approved"
          percentChange="+8%"
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BarChart
          title="Insurance Status"
          subtitle="Approved"
          percentChange="+8%"
          data={insuranceChartData}
        />
        <BarChart
          title="Loan Approvals"
          subtitle="345"
          percentChange="+2%"
          data={loanChartData}
        />
      </div>
    </div>
  );
};

export default OverviewTab;