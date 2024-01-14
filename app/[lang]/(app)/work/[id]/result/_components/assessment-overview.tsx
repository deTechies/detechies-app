"use client"
import React, { useState } from "react";

type Criterion = {
    id: string;
    name: string;
    ranks: number;
    minText: string;
    maxText: string;
    category: string;
  };
  
  type SelectedRank = {
    rank: number;
    criterion: Criterion;
  };
  
  type SelectedRanks = {
    [key: string]: SelectedRank;
  };
  
  type CategoryAveragesProps = {
    selectedRanks: SelectedRanks;
  };
  


  const AssessmentOverview: React.FC<CategoryAveragesProps> = ({ selectedRanks }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    if (!selectedRanks) {
      return <div>Loading...</div>; // or some other placeholder content
    }

    // Function to calculate averages
    const calculateAverages = (): { [category: string]: number } => {
      const totals: { [category: string]: number } = {};
      const counts: { [category: string]: number } = {};
  
      Object.values(selectedRanks).forEach(({ rank, criterion }) => {
        if (criterion && criterion.category) {
          const category = criterion.category;
          totals[category] = (totals[category] || 0) + rank;
          counts[category] = (counts[category] || 0) + 1;
        }
      });
  
      return Object.keys(totals).reduce((acc:any, category:string) => {
        acc[category] = counts[category] ? totals[category] / counts[category] : 0;
        return acc;
      }, {});
    };
  
    const averages = calculateAverages();
  
    const handleCategoryClick = (category: string) => {
      setSelectedCategory(category === selectedCategory ? null : category);
    };
  
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
            
        {Object.entries(averages).map(([category, average]) => (
          <div key={category} onClick={() => handleCategoryClick(category)}>
            <div className="flex flex-col gap-4 text-center">
                <h3 className={`${category == selectedCategory && 'text-accent-primary'} text-label_m`}>{category}</h3>
                <h3 className="text-heading_s"> {average.toFixed(2)}</h3>
            </div>
          </div>
        ))}
        </div>
         {Object.entries(averages).map(([category, average]) => (
          <div key={category}>
            {selectedCategory === category && (
              <ul>
                {Object.entries(selectedRanks).map(([id, { rank, criterion }]) => {
                  if (criterion.category === category) {
                    return <li key={id}>{criterion.name}: <span className="text-heading_s text-accent-primary">{rank}</span></li>;
                  }
                  return null;
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default AssessmentOverview;
  