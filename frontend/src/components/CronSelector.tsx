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
  const [minuteType, setMinuteType] = useState<
    "every" | "specific" | "interval"
  >("every");
  const [hourType, setHourType] = useState<"every" | "specific" | "interval">(
    "every"
  );
  const [dayType, setDayType] = useState<
    "every" | "specificWeek" | "specificMonth"
  >("every");
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
    // eslint-disable-next-line
  }, [
    minuteType,
    hourType,
    dayType,
    monthType,
    selectedMinutes,
    selectedHours,
    selectedDaysOfWeek,
    selectedDaysOfMonth,
    selectedMonths,
    intervalValue,
  ]);

  const renderMinutesTab = () => (
    <div className="space-y-4">
      <RadioGroup
        value={minuteType}
        onValueChange={(v: "every" | "specific" | "interval") =>
          setMinuteType(v)
        }
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="every"
            id="every-minute"
            className="cursor-pointer"
          />
          <Label htmlFor="every-minute" className="cursor-pointer">
            Every minute
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="interval"
            id="interval-minute"
            className="cursor-pointer"
          />
          <Label htmlFor="interval-minute" className="cursor-pointer">
            Every
          </Label>
          <Input
            type="number"
            min="1"
            max="59"
            className="w-20"
            value={intervalValue.minute}
            onChange={(e) =>
              setIntervalValue({
                ...intervalValue,
                minute: parseInt(e.target.value),
              })
            }
          />
          <Label className="cursor-pointer">minute(s)</Label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="specific"
              id="specific-minute"
              className="cursor-pointer"
            />
            <Label htmlFor="specific-minute" className="cursor-pointer">
              Specific minute (choose one or many)
            </Label>
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
                  className="data-[state=checked]:bg-primary cursor-pointer"
                />
                <label className="text-sm cursor-pointer">
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
      <RadioGroup
        value={hourType}
        onValueChange={(v: "every" | "specific" | "interval") => setHourType(v)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="every"
            id="every-hour"
            className="cursor-pointer"
          />
          <Label htmlFor="every-hour" className="cursor-pointer">
            Every hour
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="interval"
            id="interval-hour"
            className="cursor-pointer"
          />
          <Label htmlFor="interval-hour" className="cursor-pointer">
            Every
          </Label>
          <Input
            type="number"
            min="1"
            max="23"
            className="w-20"
            value={intervalValue.hour}
            onChange={(e) =>
              setIntervalValue({
                ...intervalValue,
                hour: parseInt(e.target.value),
              })
            }
          />
          <Label className="cursor-pointer">hour(s)</Label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="specific"
              id="specific-hour"
              className="cursor-pointer"
            />
            <Label htmlFor="specific-hour" className="cursor-pointer">
              Specific hour (choose one or many)
            </Label>
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
                  className="data-[state=checked]:bg-primary cursor-pointer"
                />
                <label className="text-sm cursor-pointer">
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
      <RadioGroup
        value={dayType}
        onValueChange={(v: "every" | "specificWeek" | "specificMonth") =>
          setDayType(v)
        }
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="every"
            id="every-day"
            className="cursor-pointer"
          />
          <Label htmlFor="every-day" className="cursor-pointer">
            Every day
          </Label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="specificWeek"
              id="specific-weekday"
              className="cursor-pointer"
            />
            <Label htmlFor="specific-weekday" className="cursor-pointer">
              Specific day of week (choose one or many)
            </Label>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((day, i) => (
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
                  className="data-[state=checked]:bg-primary cursor-pointer"
                />
                <label className="text-sm cursor-pointer">{day}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="specificMonth"
              id="specific-monthday"
              className="cursor-pointer"
            />
            <Label htmlFor="specific-monthday" className="cursor-pointer">
              Specific day of month (choose one or many)
            </Label>
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
                  className="data-[state=checked]:bg-primary cursor-pointer"
                />
                <label className="text-sm cursor-pointer">
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
      <RadioGroup
        value={monthType}
        onValueChange={(v: "every" | "specific") => setMonthType(v)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="every"
            id="every-month"
            className="cursor-pointer"
          />
          <Label htmlFor="every-month" className="cursor-pointer">
            Every month
          </Label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="specific"
              id="specific-month"
              className="cursor-pointer"
            />
            <Label htmlFor="specific-month" className="cursor-pointer">
              Specific month (choose one or many)
            </Label>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
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
                  className="data-[state=checked]:bg-primary cursor-pointer"
                />
                <label className="text-sm cursor-pointer">{month}</label>
              </div>
            ))}
          </div>
        </div>
      </RadioGroup>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue={activeTab}
        onValueChange={(value) => setActiveTab(value as TimeUnit)}
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="minute" className="cursor-pointer">
            Minutes
          </TabsTrigger>
          <TabsTrigger value="hour" className="cursor-pointer">
            Hours
          </TabsTrigger>
          <TabsTrigger value="day" className="cursor-pointer">
            Day
          </TabsTrigger>
          <TabsTrigger value="month" className="cursor-pointer">
            Month
          </TabsTrigger>
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
    const cronWithSeconds = `0 ${cron}`;
    return cronstrue.toString(cronWithSeconds, { verbose: true });
    // eslint-disable-next-line
  } catch (error) {
    return "Please select a schedule";
  }
};

export default CronSelector;
