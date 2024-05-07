import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateTanar() {
    const { id } = useParams(); // Assuming `id` is the correct parameter

    const [formData, setFormData] = useState({
        vezetekNev: "",
        keresztNev: "",
        email: "",
        nem: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost:7274/api/Tanarok/${id}`);
            const tanarData = response.data;
            setFormData({
                vezetekNev: tanarData.vezetekNev,
                keresztNev: tanarData.keresztNev,
                email: tanarData.email,
                nem: tanarData.nem
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`https://localhost:7274/api/Tanarok/PutTanar?Id=${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target; // Use 'name' instead of 'id'
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="container p-5 text-center">
            <h2 className="text-center">Update Tanar</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label style={{ width: "150px", display: "inline-block" }}>Vezeteknev:</label>
                    <input
                        type="text"
                        name="vezetekNev" // Add name attribute
                        value={formData.vezetekNev}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label style={{ width: "150px", display: "inline-block" }}>Keresztnev:</label>
                    <input
                        type="text"
                        name="keresztNev" // Add name attribute
                        value={formData.keresztNev}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label style={{ width: "150px", display: "inline-block" }}>Email:</label>
                    <input
                        type="text"
                        name="email" // Add name attribute
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label style={{ width: "150px", display: "inline-block" }}>Nem:</label>
                    <input
                        type="text"
                        name="nem" // Add name attribute
                        value={formData.nem}
                        onChange={handleChange}
                    />
                </div> 
                <button className="my-1">Adatok feltoltese</button>
            </form>
        </div>

    );
}
