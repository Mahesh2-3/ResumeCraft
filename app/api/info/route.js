import connectDB from "@/app/db";
import User from "@/app/models/User";

// Handle GET and POST requests

export async function GET() {
  await connectDB();
  const user = await User.findOne({ current_user: "yes" });

  try {

    if (user.length === 0) {
      return Response.json({ success: false, message: "No active users found" }, { status: 404 });
    }

    return Response.json({ success: true, user }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, message: "Server error", error }, { status: 500 });
  }
}
export async function POST(request) {
  await connectDB();
  const user = await User.findOne({ current_user: "yes" })
  let updatedUser;

  try {
    const { username = "", message } = await request.json();

    if (message !== "yes" && message !== "no") {
      return Response.json({ success: false, message: "Username and valid message ('yes' or 'no') are required" }, { status: 400 });
    }

    if (username == "") {
       updatedUser = await User.findOneAndUpdate(
        { username: user.username },
        { current_user: message },
        { new: true } // Ensures the updated document is returned
      );
    } else {
       updatedUser = await User.findOneAndUpdate(
        { username: username },
        { current_user: message },
        { new: true } // Ensures the updated document is returned
      );

    }


    if (!updatedUser) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "User updated", user: updatedUser }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, message: "Server error", error: error.message }, { status: 500 });
  }
}