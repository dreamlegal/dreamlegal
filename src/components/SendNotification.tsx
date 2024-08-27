import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const SendNotification = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6">
      <div className="text-3xl font-bold">Send Notification</div>
      <div className="w-1/3 space-y-4">
        <Textarea placeholder="Type your message here" required />
        <Button className="w-full">Send</Button>
      </div>
    </div>
  );
};

export default SendNotification;
