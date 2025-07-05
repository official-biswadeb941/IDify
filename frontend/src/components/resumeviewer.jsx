import { useState } from "react";
import { mockResume } from "../Data/resume";

export default function ResumeViewer() {
  const [inputAddress, setInputAddress] = useState("");
  const [resume, setResume] = useState<typeof mockResume | null>(null);

  const handleView = () => {
    // mock fetching resume
    setResume(mockResume);
  };

  return (
    <div className="p-4 border rounded-xl shadow-md">
      <div className="flex flex-col gap-2">
        <input className="p-2 border rounded" placeholder="User Address" value={inputAddress} onChange={e => setInputAddress(e.target.value)} />
        <button onClick={handleView} className="px-4 py-2 bg-purple-500 text-white rounded">View Resume</button>
      </div>
      {resume && (
        <div className="mt-4">
          {resume.credentials.map((cred, idx) => (
            <div key={idx} className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-lg">{cred.title}</h3>
              <p className="text-sm">Issuer: {cred.issuer}</p>
              <p className="text-sm">Metadata: <a href={cred.metadata_uri} className="text-blue-500 underline" target="_blank">View</a></p>
              <p className="text-sm">Date: {new Date(cred.timestamp).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
