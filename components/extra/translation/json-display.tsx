"use client"
import { useState } from 'react';

const JsonDisplay = ({ jsonData }: any) => {
  const renderContent = (data:any, level = 0) => {
    if (typeof data !== 'object' || data === null) {
      return <div style={{ marginLeft: `${level * 20}px`, padding: '2px', border: '1px solid #F2F2D3' }}>{data}</div>;
    }

    return Object.entries(data).map(([key, value]) => (
      <div key={key} style={{ marginLeft: `${level * 20}px` }}>
        <div style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => toggle(key)}>
          {key}:
        </div>
        {expanded[key] && renderContent(value, level + 1)}
      </div>
    ));
  };

  const [expanded, setExpanded] = useState<any>({});

  const toggle = (key:string) => {
    setExpanded({ ...expanded, [key]: !expanded[key] });
  };

  return <div>{renderContent(jsonData)}</div>;
};

export default JsonDisplay;
