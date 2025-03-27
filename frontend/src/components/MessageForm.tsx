import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { sendMessage } from "../lib/api";
import CronSelector from "./CronSelector";

const formSchema = z.object({
  phoneNumbers: z.array(z.string().min(10, "Please enter a valid phone number")),
  message: z.string().min(1, "Message cannot be empty"),
  schedule: z.string().min(1, "Please select a schedule"),
  isActive: z.boolean().default(true),
});

const MessageForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumbers: [""],
      message: "",
      schedule: "0 0 * * *", // Default to daily at midnight
      isActive: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await sendMessage(values.phoneNumbers, values.message, values.schedule, values.isActive);
      alert("Message scheduled successfully!");
      form.reset();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error scheduling message';
      alert(errorMessage);
    }
  };

  const addPhoneNumber = () => {
    const currentNumbers = form.getValues("phoneNumbers");
    form.setValue("phoneNumbers", [...currentNumbers, ""]);
  };

  const removePhoneNumber = (index: number) => {
    const currentNumbers = form.getValues("phoneNumbers");
    form.setValue(
      "phoneNumbers",
      currentNumbers.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">WhatsApp Message Scheduler</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="phoneNumbers"
            render={() => (
              <FormItem>
                <FormLabel>Phone Numbers</FormLabel>
                {form.watch("phoneNumbers").map((_, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <FormControl>
                      <Input
                        placeholder="905XXXXXXXXX"
                        {...form.register(`phoneNumbers.${index}`)}
                      />
                    </FormControl>
                    {form.watch("phoneNumbers").length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removePhoneNumber(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addPhoneNumber}
                  className="mt-2 cursor-pointer"
                >
                  + Add Number
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your message..."
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="schedule"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schedule</FormLabel>
                <FormControl>
                  <CronSelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer">Active</FormLabel>
              </FormItem>
            )}
          />

          <Button type="submit">Schedule Message</Button>
        </form>
      </Form>
    </div>
  );
};

export default MessageForm;
