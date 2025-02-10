import React, { useState } from "react";

const ParamEditor = ({ params, model }) => {
  const [paramValues, setParamValues] = useState(model.paramValues);

  const handleChange = (paramId, value) => {
    setParamValues((prev) =>
      prev.map((p) => (p.paramId === paramId ? { ...p, value } : p))
    );
  };

  const getModel = () => {
    return { paramValues };
  };

  return (
    <div>
      {params.map((param) => (
        <div key={param.id}>
          <label>{param.name}:</label>
          <input
            type="text"
            value={paramValues.find((p) => p.paramId === param.id)?.value || ""}
            onChange={(e) => handleChange(param.id, e.target.value)}
          />
        </div>
      ))}
      <button onClick={() => console.log(getModel())}>Get Model</button>
    </div>
  );
};

export default ParamEditor;
