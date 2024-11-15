"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Webpage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [sourceCode, setSourceCode] = useState("");
    const [preview, setPreview] = useState("");

    useEffect(() => {
        // Simulate fetching data for website generation
        const fetchWebsite = async () => {
            setLoading(true);
            try {
                // Call the backend to generate the website (for example, an API request)
                const response = await fetch("/api/generate-website", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();

                // Assume the API returns the source code and preview URL
                setSourceCode(data.sourceCode);
                setPreview(data.preview);
                setLoading(false);
            } catch (error) {
                console.error("Error generating website:", error);
                setLoading(false);
            }
        };

        fetchWebsite();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg bg-opacity-50 backdrop-blur-lg text-center">
            {loading ? (
                <div className="animate__animated animate__fadeIn">
                    <div className="flex justify-center items-center space-x-2">
                        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                        <p className="text-xl">Processing your website...</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Your Website is Ready!</h2>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-medium">Source Code</h3>
                        <pre>{sourceCode}</pre>
                    </div>

                    <div className="mt-4">
                        <h3 className="font-medium">Preview</h3>
                        <iframe src={preview} className="w-full h-96" title="Preview"></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}
