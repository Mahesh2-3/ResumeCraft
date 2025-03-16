import connectDB from "@/app/db";
import User from "@/app/models/User";

export async function GET() {
  await connectDB();
  const user = await User.findOne({ current_user: "yes" });

  try {
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "No active users found" }), {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",  // Allow all origins
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Server error", error: error.message }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
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
      return new Response(JSON.stringify({ success: false, message: "Username and valid message ('yes' or 'no') are required" }), {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (username === "") {
      updatedUser = await User.findOneAndUpdate(
        { username: user?.username },
        { current_user: message },
        { new: true }
      );
    } else {
      updatedUser = await User.findOneAndUpdate(
        { username: username },
        { current_user: message },
        { new: true }
      );
    }

    if (!updatedUser) {
      return new Response(JSON.stringify({ success: false, message: "User not found" }), {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    return new Response(JSON.stringify({ success: true, message: "User updated", user: updatedUser }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Server error", error: error.message }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
}
