import React from "react";

export default function ProfileCard({ credentials }) {
  return (
    <div className="p-4 border rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Resume</h2>

      {credentials && credentials.length > 0 ? (
        credentials.map((cred, idx) => (
          <div
            key={idx}
            className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <h3 className="font-semibold text-lg">{cred.title}</h3>
            <p className="text-sm">Issuer: {cred.issuer}</p>
            <p className="text-sm">
              Metadata:{" "}
              <a
                href={cred.metadata_uri}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
            <p className="text-sm">
              Date: {new Date(cred.timestamp).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No credentials found.</p>
      )}
    </div>
  );
}
