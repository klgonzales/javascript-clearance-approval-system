import React, { useEffect, useState } from "react";

export default function CreateApplication() {

    const [studentId, setStudentId] = useState('');

    useEffect(() => {
        fetch("http://localhost:3001/view-student-info", {
            method: "POST",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((body) => {
                setStudentId(body._id);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        var link = document.getElementById("link").value; // get values from the form

        var applicationDocu = { // create subject object to be passed to body
            studentId: studentId,
            github_link: link,
        }

        await fetch('http://localhost:3001/create-application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(applicationDocu)
        })
            .then((response) => response.json()) // get the response
            .then((data) => {
                console.log(data);
                if (data.success) { // if success is true
                    alert("Successfully created application!");
                } else { // success: false
                    alert("Failed to create application.");
                }
            })
            .catch((error) => { // show error
                alert(`Error: ${error}`);
            })

        // set form to blank again
        document.getElementById("link").value = ''; // get values from the form
    }

    return (
        <div className="whole-container">
            <h5>Create Clearance Application</h5>
            <div className="form-container">
                <p>Status: Open</p>
                <p>Step 1: Pre-Adviser</p>
                <form>
                    <label htmlFor="link">GitHub Link:</label><br />
                    <input type="text" id="link" name="link" required /><br />

                    {/* <label htmlFor="student-remark">Student Remark:</label><br />
                    <input type="text" id="student-remark" name="student-remark" /><br /><br /> */}

                    <input type="submit" onClick={handleSubmit} className="btn btn-primary" value="Submit" />
                    <br />

                </form>
            </div>
        </div>

    );


}