import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import cronstrue from "cronstrue";

interface CronSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

type TimeUnit = "minute" | "hour" | "day" | "month";

const CronSelector = ({ value, onChange }: CronSelectorProps) => {
  const [activeTab, setActiveTab] = useState<TimeUnit>("minute");
  const [minuteType, setMinuteType] = useState<"every" | "specific" | "interval">("every");
  const [hourType, setHourType] = useState<"every" | "specific" | "interval">("every");
  const [dayType, setDayType] = useState<"every" | "specificWeek" | "specificMonth">("every");
  const [monthType, setMonthType] = useState<"every" | "specific">("every");

  const [selectedMinutes, setSelectedMinutes] = useState<number[]>([]);
  const [selectedHours, setSelectedHours] = useState<number[]>([]);
  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState<number[]>([]);
  const [selectedDaysOfMonth, setSelectedDaysOfMonth] = useState<number[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([]);

  const [intervalValue, setIntervalValue] = useState({ minute: 1, hour: 1 });

  const generateCronExpression = () => {
    let minute = "*";
    let hour = "*";
    let day = "*";
    let month = "*";
    let weekday = "*";

    // Minutes
    if (minuteType === "specific" && selectedMinutes.length > 0) {
      minute = selectedMinutes.sort((a, b) => a - b).join(",");
    } else if (minuteType === "interval") {
      minute = `${intervalValue.minute}`;
    }

    // Hours
    if (hourType === "specific" && selectedHours.length > 0) {
      hour = selectedHours.sort((a, b) => a - b).join(",");
    } else if (hourType === "interval") {
      hour = `${intervalValue.hour}`;
    }

    // Days
    if (dayType === "specificWeek" && selectedDaysOfWeek.length > 0) {
      weekday = selectedDaysOfWeek.sort((a, b) => a - b).join(",");
      day = "?";
    } else if (dayType === "specificMonth" && selectedDaysOfMonth.length > 0) {
      day = selectedDaysOfMonth.sort((a, b) => a - b).join(",");
      weekday = "?";
    }

    // Months
    if (monthType === "specific" && selectedMonths.length > 0) {
      month = selectedMonths.sort((a, b) => a - b).join(",");
    }

    const expression = `${minute} ${hour} ${day} ${month} ${weekday}`;
    onChange(expression);
  };

  useEffect(() => {
    generateCronExpression();
  }, [
    minuteType, hourType, dayType, monthType,
    selectedMinutes, selectedHours, selectedDaysOfWeek,
    selectedDaysOfMonth, selectedMonths,
    intervalValue
  ]);

  const renderMinutesTab = () => (
    <div className="space-y-4">
      <RadioGroup value={minuteType} onValueChange={(v: "every" | "specific" | "interval") => setMinuteType(v)}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="every" id="every-minute" />
          <Label htmlFor="every-minute">Every minute</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="interval" id="interval-minute" />
          <Label htmlFor="interval-minute">Every</Label>
          <Input
            type="number"
            min="1"
            max="59"
            className="w-20"
            value={intervalValue.minute}
            onChange={(e) => setIntervalValue({ ...intervalValue, minute: parseInt(e.target.value) })}
          />
          <Label>minute(s)</Label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="specific" id="specific-minute" />
            <Label htmlFor="specific-minute">Specific minute (choose one or many)</Label>
          </div>
          <div className="grid grid-cols-10 gap-2">
            {Array.from({ length: 60 }, (_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedMinutes.includes(i)}
                  onCheckedChange={(checked) => {
                    setSelectedMinutes(
                      checked
                        ? [...selectedMinutes, i]
                        : selectedMinutes.filter((m) => m !== i)
                    );
                    setMinuteType("specific");
                  }}
                  className="data-[state=checked]:bg-primary"
                />
                <label className="text-sm">
                  {i.toString().padStart(2, "0")}
                </label>
              </div>
            ))}
          </div>
        </div>
      </RadioGroup>
    </div>
  );

  const renderHoursTab = () => (
    <div className="space-y-4">
      <RadioGroup value={hourType} onValueChange={(v: "every" | "specific" | "interval") => setHourType(v)}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="every" id="every-hour" />
          <Label htmlFor="every-hour">Every hour</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="interval" id="interval-hour" />
          <Label htmlFor="interval-hour">Every</Label>
          <Input
            type="number"
            min="1"
            max="23"
            className="w-20"
            value={intervalValue.hour}
            onChange={(e) => setIntervalValue({ ...intervalValue, hour: parseInt(e.target.value) })}
          />
          <Label>hour(s)</Label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="specific" id="specific-hour" />
            <Label htmlFor="specific-hour">Specific hour (choose one or many)</Label>
          </div>
          <div className="grid grid-cols-8 gap-2">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedHours.includes(i)}
                  onCheckedChange={(checked) => {
                    setSelectedHours(
                      checked
                        ? [...selectedHours, i]
                        : selectedHours.filter((h) => h !== i)
                    );
                    setHourType("specific");
                  }}
                  className="data-[state=checked]:bg-primary"
                />
                <label className="text-sm">
                  {i.toString().padStart(2, "0")}
                </label>
              </div>
            ))}
          </div>
        </div>
      </RadioGroup>
    </div>
  );

  const renderDaysTab = () => (
    <div className="space-y-4">
      <RadioGroup value={dayType} onValueChange={(v: "every" | "specificWeek" | "specificMonth") => setDayType(v)}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="every" id="every-day" />
          <Label htmlFor="every-day">Every day</Label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="specificWeek" id="specific-weekday" />
            <Label htmlFor="specific-weekday">Specific day of week (choose one or many)</Label>
          </div>
          <div className="flex flex-wrap gap-4">
            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, i) => (
              <div key={i} className="flex items-center gap-2 min-w-[100px]">
                <Checkbox
                  checked={selectedDaysOfWeek.includes(i)}
                  onCheckedChange={(checked) => {
                    setSelectedDaysOfWeek(
                      checked
                        ? [...selectedDaysOfWeek, i]
                        : selectedDaysOfWeek.filter((d) => d !== i)
                    );
                    setDayType("specificWeek");
                  }}
                  className="data-[state=checked]:bg-primary"
                />
                <label className="text-sm">
                  {day}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="specificMonth" id="specific-monthday" />
            <Label htmlFor="specific-monthday">Specific day of month (choose one or many)</Label>
          </div>
          <div className="grid grid-cols-10 gap-4">
            {Array.from({ length: 31 }, (_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedDaysOfMonth.includes(i + 1)}
                  onCheckedChange={(checked) => {
                    setSelectedDaysOfMonth(
                      checked
                        ? [...selectedDaysOfMonth, i + 1]
                        : selectedDaysOfMonth.filter((d) => d !== i + 1)
                    );
                    setDayType("specificMonth");
                  }}
                  className="data-[state=checked]:bg-primary"
                />
                <label className="text-sm">
                  {(i + 1).toString().padStart(2, "0")}
                </label>
              </div>
            ))}
          </div>
        </div>
      </RadioGroup>
    </div>
  );

  const renderMonthsTab = () => (
    <div className="space-y-4">
      <RadioGroup value={monthType} onValueChange={(v: "every" | "specific") => setMonthType(v)}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="every" id="every-month" />
          <Label htmlFor="every-month">Every month</Label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="specific" id="specific-month" />
            <Label htmlFor="specific-month">Specific month (choose one or many)</Label>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ].map((month, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedMonths.includes(i + 1)}
                  onCheckedChange={(checked) => {
                    setSelectedMonths(
                      checked
                        ? [...selectedMonths, i + 1]
                        : selectedMonths.filter((m) => m !== i + 1)
                    );
                    setMonthType("specific");
                  }}
                  className="data-[state=checked]:bg-primary"
                />
                <label className="text-sm">
                  {month}
                </label>
              </div>
            ))}
          </div>
        </div>
      </RadioGroup>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as TimeUnit)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="minute">Minutes</TabsTrigger>
          <TabsTrigger value="hour">Hours</TabsTrigger>
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>
        <TabsContent value="minute">{renderMinutesTab()}</TabsContent>
        <TabsContent value="hour">{renderHoursTab()}</TabsContent>
        <TabsContent value="day">{renderDaysTab()}</TabsContent>
        <TabsContent value="month">{renderMonthsTab()}</TabsContent>
      </Tabs>

      <div className="p-4 bg-gray-900 text-white rounded-lg">
        <p className="text-sm text-gray-400">
          Your selection: {formatCronExpression(value)}
        </p>
      </div>
    </div>
  );
};

const formatCronExpression = (cron: string): string => {
  try {
    // cronstrue 5 parçalı cron ifadelerini bekler, biz seconds kısmını ekleyelim
    const cronWithSeconds = `0 ${cron}`;
    return cronstrue.toString(cronWithSeconds, { verbose: true });
  } catch (error) {
    return "Please select a schedule";
  }
};

export default CronSelector; 