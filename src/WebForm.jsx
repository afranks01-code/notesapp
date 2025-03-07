import { useState } from "react";


const WebForm = () => {
  const [formData, setFormData] = useState({
    client: "",
    project: "",
    clockify: "",
    smartsheets: "",
    projtype: "",
    pmgr: "", // Default selected value
    devresource: "",
    qaresource: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const API_URL = "https://4uytsn5xa9.execute-api.us-east-2.amazonaws.com/default/ps-clientOnboarding";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log the formData right before submitting
    console.log("Submitting data:", formData);  // This will print formData to the browser console
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        setResponseMessage(`Success: ${result.message}`);
        setFormData({
          client: "",
          project_code: "",
          project_name: "",
          clockify: "",
          smartsheets: "",
          projtype: "",
          pmgr: "",
          devresource: "",
          qaresource: "",
        }); // Reset form
      } else {
        setResponseMessage("Error submitting form");
      }
    } catch (error) {
      console.error("Network error:", error);  // Log any network errors
      setResponseMessage("Network error");
    }
  };
  

  return (

    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Smartsheets Client Onboarding Test</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
        Client Name:
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label><br /><br />
        <label className="block mb-2">
        Project Code (i.e. CLIENT-S1901):
          <input
            type="text"
            name="project_code"
            value={formData.project_code}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label><br /><br />
        <label className="block mb-2">
        Project Name (i.e. CLIENT Onboarding):
          <input
            type="text"
            name="project_name"
            value={formData.project_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label><br /><br />
        <label className="block mb-2">
        <b>Create Clockify Project?</b>
          <select
            name="clockify"
            value={formData.clockify}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select One:</option>
            <option value="True">Yes</option>
            <option value="False">No</option>
          </select>
        </label>
        {/* Conditionally Show Resources */}
        {formData.clockify === "True" && (
          <div className="mt-2 pl-6 border-l-4 border-gray-300">
          <label className="block mb-2">
          <ul>Project Manager:
          <select
            name="pmgr"
            value={formData.pmgr}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select One:</option>
            <option value="5e976896bb457c10356071a2">Kim Chiu</option>
            <option value="6050fd199d1fbf13678fe224">Negar Samenirad</option>
            <option value="6050fd199d1fbf13678fe225">Corina Beitz</option>
            <option value="603ec7d1c9f498644ed91d1e">Jonathan Epp</option>
          </select></ul>
          </label></div>
          )}
        {formData.clockify === "True" && (
          <div className="mt-2">
           <label className="block mb-2">
            <ul>Dev Resource:
              <select
                name="devresource"
                value={formData.devresource}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select One:</option>
                <option value="6054ca5816d7fa0014bd6b9e">Robert Kim</option>
                <option value="6054ca5816d7fa0014bd6b9d">Di Wang</option>
                <option value="6054ca31c70e5d7198483db6">Andy Franks</option>
                <option value="6054c67016d7fa0014bd3a53">Akhtar Hussain</option>
                <option value="6054ca5816d7fa0014bd6b9f">Dennis Candelaria</option>
              </select></ul>
            </label> </div>
          )}
          {formData.clockify === "True" && (
          <div className="mt-2">
          <label className="block mb-2">
          <ul>QA Resource:
            <select
              name="qaresource"
              value={formData.qaresource}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select One:</option>
              <option value="6054ca5816d7fa0014bd6b9d">Di Wang</option>
              <option value="6050fd199d1fbf13678fe224">Negar Samenirad</option>
            </select></ul>
          </label></div> 
          )}
          <div className="mt-2"><br></br>
          <label className="block mb-2">
          <b>Create Smartsheets?</b>
            <select
              name="smartsheets"
              value={formData.smartsheets}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select One:</option>
              <option value="True">Yes</option>
              <option value="False">No</option>
            </select>
          </label></div>
        
        {/* Conditionally Show Smartsheets Fields */}
        {formData.smartsheets === "True" && (
          <div className="mt-4">
            <div className="pl-8 ml-4 border-l-4 border-blue-300">
              <label className="block mb-2">
              <ul>Smartsheets Project Execution (Start) Date:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                /></ul>
              </label>
            </div>
          </div>
        )}
          {formData.smartsheets === "True" && (
          <div className="mt-2">
          <label className="block mb-2">
          <ul>Project Type:
            <select
              name="projtype"
              value={formData.projtype}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select One:</option>
              <option value="ONBOARD">Client Onboarding</option>
              <option value="DECOM">Client Decommissioning</option>
            </select></ul>
          </label> </div>
          )}

        <br /><br /><button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
      {responseMessage && <p className="mt-4">{responseMessage}</p>}
    </div>
  );
};

export default WebForm;
