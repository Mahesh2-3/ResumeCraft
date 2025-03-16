import connectDB from "@/app/db";
import User from "@/app/models/User";

// Define allowed origins (replace with your frontend URL)
const allowedOrigins = ["https://resume-craft-kw2d2i446-maheshs-projects-99f7ee59.vercel.app"];

const headers = {
  "Access-Control-Allow-Origin": allowedOrigins.join(", "), // Allow specific origins
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allowed HTTP methods
  "Access-Control-Allow-Headers": "Content-Type", // Allowed headers
  "Content-Type": "application/json", // Response content type
};

export async function GET() {
  await connectDB();
  const user = await User.findOne({ current_user: "yes" });

  try {
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "No active users found" }), {
        status: 404,
        headers,
      });
    }

    return new Response(JSON.stringify({ success: true, user }), { status: 200, headers });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Server error", error }), {
      status: 500,
      headers,
    });
  }
}

export async function POST(request) {
  await connectDB();
  const user = await User.findOne({ current_user: "yes" });
  let updatedUser;

  try {
    const { username = "", message } = await request.json();

    if (message !== "yes" && message !== "no") {
      return new Response(
        JSON.stringify({ success: false, message: "Valid message ('yes' or 'no') is required" }),
        { status: 400, headers }
      );
    }

    if (username === "") {
      updatedUser = await User.findOneAndUpdate(
        { username: user?.username },
        { current_user: message },
        { new: true }
      );
    } else {
      updatedUser = await User.findOneAndUpdate(
        { username },
        { current_user: message },
        { new: true }
      );
    }

    if (!updatedUser) {
      return new Response(JSON.stringify({ success: false, message: "User not found" }), {
        status: 404,
        headers,
      });
    }

    return new Response(JSON.stringify({ success: true, message: "User updated", user: updatedUser }), {
      status: 200,
      headers,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Server error", error: error.message }), {
      status: 500,
      headers,
    });
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers,
  });
}
