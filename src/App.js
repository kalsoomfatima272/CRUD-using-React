import { useState, useEffect } from "react";
import { EmployeeData } from "./EmployeeData";

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [IsUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.find((item) => item.id === id);
    if (dt) {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt.firstName);
      setLastName(dt.lastName);
      setAge(dt.age);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    let error = "";
    if (!firstName.trim()) error += "First name is required. ";
    if (!lastName.trim()) error += "Last name is required. ";
    if (age <= 0) error += "Valid age is required.";

    if (!error) {
      const newObject = {
        id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
        firstName,
        lastName,
        age: Number(age),
      };
      setData([...data, newObject]);
      handleClear();
    } else {
      alert(error);
    }
  };

  const handleUpdate = () => {
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedData = [...data];
      updatedData[index] = { id, firstName, lastName, age: Number(age) };
      setData(updatedData);
      handleClear();
    }
  };

  const handleClear = () => {
    setId(0);
    setFirstName("");
    setLastName("");
    setAge(0);
    setIsUpdate(false);
  };

  const containerStyle = {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    padding: "20px",
  };

  const titleStyle = {
    color: "#007bff",
    fontSize: "24px",
    fontWeight: "bold",
    display: "inline-block",
    borderBottom: "3px solid #007bff",
    paddingBottom: "5px",
    marginBottom: "20px",
  };

  const inputStyle = {
    padding: "10px",
    margin: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "200px",
  };

  const buttonStyle = {
    padding: "10px 15px",
    margin: "5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const tableStyle = {
    width: "80%",
    margin: "20px auto",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>CRUD using React</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Enter First Name"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Enter Last Name"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Enter Age"
          min="1"
          onChange={(e) => setAge(e.target.value)}
          value={age}
          style={inputStyle}
        />
        <div>
          {!IsUpdate ? (
            <button
              style={{ ...buttonStyle, backgroundColor: "#28a745", color: "white" }}
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              style={{ ...buttonStyle, backgroundColor: "#ffc107", color: "black" }}
              onClick={handleUpdate}
            >
              Update
            </button>
          )}
          <button
            style={{ ...buttonStyle, backgroundColor: "#6c757d", color: "white" }}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>

      <table style={tableStyle} border="1">
        <thead style={{ backgroundColor: "#007bff", color: "white" }}>
          <tr>
            <th>Sr No</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff" }}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button
                  style={{ ...buttonStyle, backgroundColor: "#007bff", color: "white" }}
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                <button
                  style={{ ...buttonStyle, backgroundColor: "#dc3545", color: "white" }}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
