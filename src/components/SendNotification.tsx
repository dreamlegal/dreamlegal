import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import QuestionPanel from "@/app/admin/_components/QuestionPanel";
import AdminComparisonPanel from "@/app/admin/_components/AdminComparisonPanel";
const SendNotification = () => {
  const [message, setMessage] = useState("");
  const [notifyAllAccounts, setNotifyAllAccounts] = useState(false);
  const [notifyAllUsers, setNotifyAllUsers] = useState(false);
  const [notifyAllVendors, setNotifyAllVendors] = useState(false);
  const [userId, setUserId] = useState("");
  const [vendorId, setVendorId] = useState("");

  const handleSendNotification = async () => {
    try {
      const response = await fetch("/api/add-notification", {
        method: "POST",
        body: JSON.stringify({
          message,
          userId: userId || false,
          vendorId: vendorId || false,
          notifyAllAccounts,
          notifyAllUsers,
          notifyAllVendors,
        }),
      });
      const data = await response.json();
      if (!data.success) {
        const errorResponse = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorResponse.error}`
        );
      }
      alert("Notification sent successfully");
    } catch (error) {
      console.error("An error occurred:", error);
      alert(
        "Failed to send notification. Please check the console for details."
      );
    }
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center py-10 px-4 space-y-6 md:py-20 md:px-6 lg:px-8">
      <div className="text-2xl font-bold md:text-3xl">Send Notification</div>
      <div className="w-full max-w-lg space-y-4">
        <Textarea
          placeholder="Type your message here"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-gray-300 rounded-lg w-full"
        />
        <div className="p-4 border border-gray-300 rounded-lg">
          <div className="font-semibold mb-2">Select Recipients:</div>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notifyAllAccounts}
                onChange={(e) => {
                  setNotifyAllAccounts(e.target.checked);
                  if (e.target.checked) {
                    setNotifyAllUsers(false);
                    setNotifyAllVendors(false);
                  }
                }}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span>Notify All Accounts</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notifyAllUsers}
                onChange={(e) => {
                  setNotifyAllUsers(e.target.checked);
                  if (e.target.checked) {
                    setNotifyAllAccounts(false);
                    setNotifyAllVendors(false);
                  }
                }}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span>Notify All Users</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notifyAllVendors}
                onChange={(e) => {
                  setNotifyAllVendors(e.target.checked);
                  if (e.target.checked) {
                    setNotifyAllAccounts(false);
                    setNotifyAllUsers(false);
                  }
                }}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span>Notify All Vendors</span>
            </label>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="User ID (optional)"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-2 border rounded-lg mt-2"
            />
            <input
              type="text"
              placeholder="Vendor ID (optional)"
              value={vendorId}
              onChange={(e) => setVendorId(e.target.value)}
              className="w-full p-2 border rounded-lg mt-2"
            />
          </div>
        </div>
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          onClick={handleSendNotification}
        >
          Send
        </Button>
      </div>
    </div>
    <QuestionPanel/>
    <AdminComparisonPanel/>
    </>
  );
};

export default SendNotification;
