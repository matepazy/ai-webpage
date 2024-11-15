import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogOut, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";

// This function is server-side and handles authentication and user fetching
async function getUserData() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();
    
    if (!isLoggedIn) {
        redirect("/api/auth/login");
    }

    const user = await getUser();
    return { user, isLoggedIn };
}

export default async function Dashboard() {
    const { user, isLoggedIn } = await getUserData();

    if (!isLoggedIn) {
        return <div>Redirecting to login...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg bg-opacity-50 backdrop-blur-lg text-center transition-all ease-in-out">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg animate__animated animate__fadeIn mb-52">
                <p className="mb-4 text-2xl font-semibold">Tell us all about the website!</p>
                <form method="POST" action="/api/generate-website" className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium">Elements and logic</label>
                        <select
                            name="elementChoice"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="React">React</option>
                            <option value="HTML">HTML + JavaScript</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Styling</label>
                        <select
                            name="styleChoice"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="CSS">CSS</option>
                            <option value="Tailwind">Tailwind</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Describe the Webpage</label>
                        <textarea
                            name="description"
                            rows={4}
                            placeholder="Enter a description for the webpage..."
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        Generate Website
                    </button>
                </form>
            </div>

            <div className="fixed z-50 bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-white shadow-lg rounded-xl border w-80 animate__animated animate__fadeIn animate__delay-1s">
                <div className="flex items-center space-x-4">
                    <div>
                        <p><strong>Logged in as</strong> {user.given_name}</p>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        {user.picture && <img src={user.picture} alt="User profile" className="w-16 rounded-full" />}
                    </div>
                </div>
                <div className="mt-4 text-center">
                    {isLoggedIn && (
                        <LogoutLink className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 mr-5 inline-block transition duration-200 ease-in-out">
                            <button><LogOut className="inline w-5 mr-2" /> Logout</button>
                        </LogoutLink>
                    )}
                    <a href="#" className="inline-block mt-2 text-blue-500 hover:text-blue-600">
                        <Sparkles className="inline w-5 mr-2" /> Upgrade
                    </a>
                </div>
            </div>
        </div>
    );
}
