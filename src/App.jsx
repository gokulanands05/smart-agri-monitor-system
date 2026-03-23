import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

function App() {
  const [crop, setCrop] = useState("");
  const [moisture, setMoisture] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [stage, setStage] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await supabase.from("farm_data").select("*");
    setData(data);
  }

  async function handleAdd() {
    let crop_status = "";

    if (moisture < 30 && temp > 35) {
      crop_status = "Critical";
    } else if (moisture >= 30 && moisture <= 60) {
      crop_status = "Good";
    } else if (moisture > 60) {
      crop_status = "Wet";
    } else {
      crop_status = "Normal";
    }

    await supabase.from("farm_data").insert([
      {
        crop_name: crop,
        soil_moisture: moisture,
        temperature: temp,
        humidity: humidity,
        crop_status: crop_status,
        growth_stage: stage,
      },
    ]);

    setCrop("");
    setMoisture("");
    setTemp("");
    setHumidity("");
    setStage("");
    fetchData();
  }

  const totalCrops = data.length;
  const critical = data.filter(item => item.crop_status === "Critical").length;
  const good = data.filter(item => item.crop_status === "Good").length;

  return (
    <div className="container">
      <h1 className="title">🌱 Smart Agriculture Monitoring System</h1>

      <div className="stats-container">
        <div className="stat-box">
          <h3>Total Crops</h3>
          <p>{totalCrops}</p>
        </div>

        <div className="stat-box">
          <h3>Healthy Crops</h3>
          <p>{good}</p>
        </div>

        <div className="stat-box">
          <h3>Critical Crops</h3>
          <p>{critical}</p>
        </div>
      </div>

      <div className="form-box">
        <h3>Add Farm Data</h3>

        <div className="input-group">
          <input
            placeholder="Crop Name"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
          />
          <input
            placeholder="Soil Moisture"
            value={moisture}
            onChange={(e) => setMoisture(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            placeholder="Temperature (°C)"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
          />
          <input
            placeholder="Humidity (%)"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
          />
        </div>

        <input
          placeholder="Growth Stage (Seedling/Vegetative/Flowering/Harvest)"
          value={stage}
          onChange={(e) => setStage(e.target.value)}
        />

        <button onClick={handleAdd}>Add Data</button>
      </div>

      <h2 className="section-title">Farm Monitoring Data</h2>

      <div className="card-container">
        {data?.map((item) => (
          <div key={item.id} className="card">
            <h4>{item.crop_name}</h4>
            <p><b>Moisture:</b> {item.soil_moisture}</p>
            <p><b>Temperature:</b> {item.temperature} °C</p>
            <p><b>Humidity:</b> {item.humidity}%</p>
            <p><b>Growth Stage:</b> {item.growth_stage}</p>
            <p>
              <b>Status:</b>
              <span className={
                item.crop_status === "Critical"
                  ? "bad"
                  : "good"
              }>
                {" "}{item.crop_status}
              </span>
            </p>
          </div>
        ))}
      </div>

      <p className="members-credit">Done by Gokulanand | Mohamed basil | Lakshan</p>
    </div>
  );
}

export default App;