import { useState } from "react";


const WebForm = () => {
  const [formData, setFormData] = useState({
    client: "",
    project: "",
    clockify: "False",
    smartsheets: "False",
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
        setFormData({ client: "", project: "", clockify: "", smartsheets: "", projtype: "", pmgr: "", devresource: "", qaresource: "",}); // Reset form
      } else {
        setResponseMessage("Error submitting form");
      }
    } catch (error) {
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
        Project Code:
          <input
            type="text"
            name="project"
            value={formData.project}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label><br /><br />
        <label className="block mb-2">
        Create Clockify Project?
          <select
            name="clockify"
            value={formData.clockify}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="True">Yes</option>
            <option value="False">No</option>
          </select>
        </label><br /><br />
        <label className="block mb-2">
        Create Smartsheets?
          <select
            name="smartsheets"
            value={formData.smartsheets}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="True">Yes</option>
            <option value="False">No</option>
          </select>
        </label>
        {/* Conditionally Show Follow-up Date Field */}
        {formData.smartsheets === "True" && (
          <div className="mt-2"><br></br>
          <label className="block mb-2">
          Smartsheets Project Execution (Start) Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required={formData.smartsheets === "True"}
            />
          </label> </div>
          )}
        <br /><br /><label className="block mb-2">
        Project Type:
          <select
            name="projtype"
            value={formData.projtype}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="ONBOARD">Client Onboarding</option>
            <option value="DECOM">Client Decommissioning</option>
          </select>
        </label><br /><br />
        <label className="block mb-2">
          Project Manager:
          <select
            name="pmgr"
            value={formData.pmgr}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="5e976896bb457c10356071a2">Kim Chiu</option>
            <option value="6050fd199d1fbf13678fe224">Negar Samenirad</option>
            <option value="6050fd199d1fbf13678fe225">Corina Beitz</option>
            <option value="603ec7d1c9f498644ed91d1e">Jonathan Epp</option>
          </select>
        </label><br /><br />
        <label className="block mb-2">
        Dev Resource:
          <select
            name="devresource"
            value={formData.devresource}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="6054ca5816d7fa0014bd6b9e">Robert Kim</option>
            <option value="6054ca5816d7fa0014bd6b9d">Di Wang</option>
            <option value="6054ca31c70e5d7198483db6">Andy Franks</option>
			<option value="6054c67016d7fa0014bd3a53">Akhtar Hussain</option>
            <option value="6054ca5816d7fa0014bd6b9f">Dennis Candelaria</option>
          </select>
        </label><br /><br />
        <label className="block mb-2">
        Project Type:
          <select
            name="qaresource"
            value={formData.qaresource}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="6054ca5816d7fa0014bd6b9d">Di Wang</option>
            <option value="6050fd199d1fbf13678fe224">Negar Samenirad</option>
          </select>
        </label><br /><br />
        <br /><br /><button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
      {responseMessage && <p className="mt-4">{responseMessage}</p>}
    </div>
  );
};

export default WebForm;
