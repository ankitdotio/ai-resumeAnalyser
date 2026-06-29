import React, { useRef, useState } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

export const Home = () => {
  const {loading,generateReport} = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const resumeInputRef = useRef()

  const navigate = useNavigate()

  const handleGenerateReport=async()=>{
    const resumeFile = resumeInputRef.current.files[0]
    const data = await generateReport({jobDescription,selfDescription,resumeFile})
    navigate(`/interview/${data._id}`)
  }
  return (
    <div className="home-page">
      <section className="hero">
        <h1>
          Create Your Custom <span>Interview Plan</span>
        </h1>
        <p>
          Let our AI analyze the job requirements and your profile to build a
          winning interview strategy.
        </p>
      </section>

      <main className="home">
        <div className="left panel">
          <div className="panel-header">
            <h2>🎯 Target Job Description</h2>
            <span className="badge">Required</span>
          </div>

          <textarea
            onChange={(e)=>setJobDescription(e.target.value)}
            id="jobDescription"
            placeholder="Paste the full job description here..."
          />
          <span className="counter">0 / 5000 chars</span>
        </div>

        <div className="right panel">
          <div className="panel-header">
            <h2>👤 Your Profile</h2>
          </div>

          <div className="input-group">
            <label>
              Upload Resume <span className="badge">Best Results</span>
            </label>

            <label htmlFor="resume" className="upload-box">
              <div className="upload-icon">☁</div>
              <h3>Click to upload or drag & drop</h3>
              <p>PDF or DOCX (Max 5MB)</p>
            </label>

            <input
              ref={resumeInputRef}
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              hidden
            />
          </div>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="input-group">
            <label>Quick Self Description</label>

            <textarea
              onChange={(e)=>setSelfDescription(e.target.value)}
              id="selfDescription"
              placeholder="Briefly describe your experience, skills and background..."
            />
          </div>

          <div className="info">
            ℹ Either a Resume or a Self Description is required.
          </div>
        </div>

        <div className="bottom">
          <p>AI Powered Strategy Generation • Approx 30s</p>

          <button
          onClick={handleGenerateReport}
          className="generate-btn">
            ⭐ Generate My Interview Strategy
          </button>
        </div>
      </main>

      <footer>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Help Center</a>
      </footer>
    </div>
  );
};
