'use client'
import SingleRadialCarChart from '@/components/charts/radial-chart';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
interface CategoryData {
    responses: any[];
    total: number;
    average: number;
  }
  
  const colors =
  [
    '#0CAB6D', 
    '#096EFE', 
    '#F59754' 
  ]
const CategoryOverview = ({responses}: {responses:any[]}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#0CAB6D");

  // Assuming `responses` is the array of your response data

  // Function to calculate the average
  const calculateAverage = (values: string[]) => {
    const sum = values.reduce((acc, val) => acc + parseFloat(val), 0);
    return sum / values.length;
  };

  // Organizing the data by category
  const categoryData: Record<string, CategoryData> = responses.reduce((acc:any, response:any) => {
    const category = response.question.category;
    if (!acc[category]) {
      acc[category] = { responses: [], total: 0, average: 0 };
    }
    acc[category].responses.push(response);
    acc[category].total += parseFloat(response.response);
    return acc as any;
  }, {});

  // Calculating averages
  Object.keys(categoryData).forEach(category => {
    categoryData[category].average = calculateAverage(
      categoryData[category].responses.map(res => res.response)
    );
  });

  return (
    <div className="flex flex-col gap-2">
    <Card className="grid grid-cols-3">
      {Object.entries(categoryData).map(([category, data], index:number) => (
        <div key={category} onClick={() => {
            setSelectedCategory(category)
            setSelectedColor(colors[index])
        }}>
            <SingleRadialCarChart 
                name={category}
                average={parseInt(data.average.toFixed(2))}
                colorClass={colors[index]}
            />
        </div>
      ))}
      </Card>

      {selectedCategory && (
        <Card>
          <h4 className="text-heading_s my-4">{selectedCategory}</h4>
          <div className="flex flex-col gap-8">
            {categoryData[selectedCategory].responses.map((res) => (

              <div key={res.id} className="flex flex-col gap-2">
                <Label>
                    {res.question.content}
                </Label>
                <section className="flex gap-3 items-center">
                <div className="grow">
                        <Progress value={res.response}  />
                    </div>
                    <span className="text-label_m">
                        {parseInt(res.response).toFixed(2)}
                    </span>
                   
                </section>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CategoryOverview;
