import React, { useState, useEffect } from "react";
import TemplateList from "./TemplateList";
import TemplateCreationForm from "./TemplateCreationForm";
import { TemplateFormProvider, useTemplateForm } from "./TemplateFormContext"; 
import TemplateService from "../services/TemplateService";

const InnerContainer2Content = ({ 
  activeInnerTab, 
  setActiveInnerTab, 
  userTemplates, 
  refreshTemplates 
}) => {
  const { populateEditForm } = useTemplateForm();

  return (
    <div
      className="inner-container"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        margin: "0 250px",
        minWidth: 0,
        overflowX: "hidden",
      }}
    >
      <div style={tabsStyle}>
        {["Creation Statistics", "Create / Edit Project"].map((label, index) => (
          <div
            key={index}
            style={tabStyle(index + 1, activeInnerTab)}
            onClick={() => setActiveInnerTab(index + 1)}
          >
            {label}
          </div>
        ))}
      </div>

      <div style={innerContentStyle}>
        {activeInnerTab === 1 && (
          <TemplateList 
            templates={userTemplates} 
            onEdit={(template) => {
              setActiveInnerTab(2);
              populateEditForm(template);
            }} 
          />
        )}

        {activeInnerTab === 2 && (
          <TemplateCreationForm 
            onRefresh={refreshTemplates}
          />
        )}
      </div>
    </div>
  );
};

const tabsStyle = { display: "flex", backgroundColor: "#ffcccc" };
const tabStyle = (tabNumber, activeTab) => ({
  flex: 1,
  padding: "2px 0",
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: "#ffffff",
  color: activeTab === tabNumber ? "#d90000" : "#000000",
  fontWeight: activeTab === tabNumber ? "bold" : "normal",
  border: "1px solid #ccc",
  borderBottom: activeTab === tabNumber ? "2px solid #d90000" : "1px solid #ccc",
  margin: "0",
  borderRadius: "0",
  boxSizing: "border-box",
});

const innerContentStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #D9D9D9",
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: "10px 0px",
  boxSizing: "border-box",
  overflowX: "hidden",
};

const InnerContainer2 = ({ activeInnerTab: propActiveInnerTab }) => {
  const [activeInnerTab, setActiveInnerTab] = useState(propActiveInnerTab || 1);
  const [userTemplates, setUserTemplates] = useState([]);

  useEffect(() => {
    if (propActiveInnerTab) setActiveInnerTab(propActiveInnerTab);
  }, [propActiveInnerTab]);

  useEffect(() => {
    fetchUserTemplates();
  }, []);

  const fetchUserTemplates = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("currentUser") || "{}")?.userID;
      if (!userId) return;

      const response = await TemplateService.getUserTemplates(userId);
      setUserTemplates(response.data);
    } catch (err) {
      console.error("Failed to fetch templates:", err);
    }
  };

  const refreshTemplates = async () => {
    await fetchUserTemplates();
  };

  return (
    <TemplateFormProvider>
      <InnerContainer2Content
        activeInnerTab={activeInnerTab}
        setActiveInnerTab={setActiveInnerTab}
        userTemplates={userTemplates}
        refreshTemplates={refreshTemplates}
      />
    </TemplateFormProvider>
  );
};

export default InnerContainer2;