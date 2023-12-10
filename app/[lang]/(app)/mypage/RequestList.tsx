"use client";
import { Divide } from "lucide-react";
import { useState } from "react";

const RequestList = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const tabData = [
    { id: 0, title: "내가 요청한 평가", content: "Content for Tab 1" },
    { id: 1, title: "요청받은 평가", content: "Content for Tab 2" },
    { id: 2, title: "내가 작성한 평가", content: "Content for Tab 3" },
  ];

  return (
    <div>
      <div className="">
        {tabData.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(index)}
            className={index === activeTab ? "active" : "none"}
          >
            <p className="text-lg m-5">{tab.title}</p>
          </button>
        ))}
      </div>
      <div>
        <hr style={{ height: "0.2rem", background: "gray" }} />
        <hr style={{  height: "0.3rem", background: "green" }} />
      </div>
      <div className="">{tabData[activeTab].content}</div>
    </div>
  );
};

export default RequestList;
