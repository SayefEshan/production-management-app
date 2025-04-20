import React from "react";

export default function FilePreviewModal({
    previewUrl,
    previewName,
    setPreviewUrl,
    setPreviewName,
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-6 rounded-lg max-w-[90%] max-h-[90%] overflow-auto relative shadow-lg">
                <h2 className="text-lg font-bold mb-4">{previewName}</h2>
                <img
                    src={previewUrl}
                    alt={previewName}
                    className="max-w-full max-h-[70vh] mb-4"
                />
                <div className="text-right">
                    <button
                        onClick={() => {
                            setPreviewUrl(null);
                            setPreviewName("");
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
