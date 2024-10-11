// src/App.tsx
import React from "react";
import LeadCaptureForm from "./pages/leadCaptureForm";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center my-4">
        Página de Captura de Leads
      </h1>
      <LeadCaptureForm />
    </div>
  );
};

export default App;
