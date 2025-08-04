import { useState } from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import classes from "./EventFormPage.module.css";

interface EventFormData {
  address: string;
  date: string;
  time: string;
  timezone: string;
  dressCode: string;
  maxCapacity: number;
  minPeopleRequired: number;
  peopleInvited: number;
  confirmedGuests: number;
  eventType: "invite-only" | "open";
  entrancePrice: number;
}

const timezoneOptions = [
  { value: "UTC", label: "UTC" },
  { value: "EST", label: "Eastern Standard Time" },
  { value: "CST", label: "Central Standard Time" },
  { value: "MST", label: "Mountain Standard Time" },
  { value: "PST", label: "Pacific Standard Time" },
  { value: "GMT", label: "Greenwich Mean Time" },
  { value: "CET", label: "Central European Time" },
  { value: "JST", label: "Japan Standard Time" },
  { value: "AEST", label: "Australian Eastern Standard Time" },
];

const eventTypeOptions = [
  { value: "invite-only", label: "Invite Only" },
  { value: "open", label: "Open Event" },
];

export default function EventFormPage() {
  const [formData, setFormData] = useState<EventFormData>({
    address: "",
    date: "",
    time: "",
    timezone: "",
    dressCode: "",
    maxCapacity: 0,
    minPeopleRequired: 0,
    peopleInvited: 0,
    confirmedGuests: 0,
    eventType: "invite-only",
    entrancePrice: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof EventFormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    if (!formData.timezone) {
      newErrors.timezone = "Timezone is required";
    }

    if (!formData.dressCode.trim()) {
      newErrors.dressCode = "Dress code is required";
    }

    if (formData.maxCapacity <= 0) {
      newErrors.maxCapacity = "Maximum capacity must be greater than 0";
    }

    if (formData.minPeopleRequired <= 0) {
      newErrors.minPeopleRequired = "Minimum people required must be greater than 0";
    }

    if (formData.peopleInvited < 0) {
      newErrors.peopleInvited = "People invited cannot be negative";
    }

    if (formData.confirmedGuests < 0) {
      newErrors.confirmedGuests = "Confirmed guests cannot be negative";
    }

    if (formData.entrancePrice < 0) {
      newErrors.entrancePrice = "Entrance price cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Here you would typically send the data to your backend
      alert("Event created successfully!");
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.formWrapper}>
        <h1 className={classes.title}>Create New Event</h1>

        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.section}>
            <h2 className={classes.sectionTitle}>Event Details</h2>

            <Input
              label='Address'
              type='text'
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
              placeholder='Enter event address'
              className={errors.address ? classes.error : ""}
            />

            <div className={classes.row}>
              <Input
                label='Date'
                type='date'
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
                className={errors.date ? classes.error : ""}
              />

              <Input
                label='Time'
                type='time'
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                required
                className={errors.time ? classes.error : ""}
              />
            </div>

            <Select
              label='Timezone'
              options={timezoneOptions}
              value={formData.timezone}
              onChange={(e) => handleInputChange("timezone", e.target.value)}
              required
              className={errors.timezone ? classes.error : ""}
            />

            <Input
              label='Dress Code'
              type='text'
              value={formData.dressCode}
              onChange={(e) => handleInputChange("dressCode", e.target.value)}
              required
              placeholder='e.g., Formal, Casual, Business Casual'
              className={errors.dressCode ? classes.error : ""}
            />
          </div>

          <div className={classes.section}>
            <h2 className={classes.sectionTitle}>Capacity & Attendance</h2>

            <div className={classes.row}>
              <Input
                label='Maximum Capacity'
                type='number'
                min='1'
                value={formData.maxCapacity}
                onChange={(e) => handleInputChange("maxCapacity", parseInt(e.target.value) || 0)}
                required
                placeholder='Maximum number of attendees'
                className={errors.maxCapacity ? classes.error : ""}
              />

              <Input
                label='Minimum People Required'
                type='number'
                min='1'
                value={formData.minPeopleRequired}
                onChange={(e) => handleInputChange("minPeopleRequired", parseInt(e.target.value) || 0)}
                required
                placeholder='Minimum attendees needed'
                className={errors.minPeopleRequired ? classes.error : ""}
              />
            </div>

            <div className={classes.row}>
              <Input
                label='People Invited'
                type='number'
                min='0'
                value={formData.peopleInvited}
                onChange={(e) => handleInputChange("peopleInvited", parseInt(e.target.value) || 0)}
                placeholder='Number of people invited'
                className={errors.peopleInvited ? classes.error : ""}
              />

              <Input
                label='Confirmed Guests'
                type='number'
                min='0'
                value={formData.confirmedGuests}
                onChange={(e) => handleInputChange("confirmedGuests", parseInt(e.target.value) || 0)}
                placeholder='Number of confirmed guests'
                className={errors.confirmedGuests ? classes.error : ""}
              />
            </div>
          </div>

          <div className={classes.section}>
            <h2 className={classes.sectionTitle}>Event Type & Pricing</h2>

            <Select
              label='Event Type'
              options={eventTypeOptions}
              value={formData.eventType}
              onChange={(e) => handleInputChange("eventType", e.target.value as "invite-only" | "open")}
              required
            />

            <Input
              label='Entrance Price'
              type='number'
              min='0'
              step='0.01'
              value={formData.entrancePrice}
              onChange={(e) => handleInputChange("entrancePrice", parseFloat(e.target.value) || 0)}
              placeholder='0.00'
              className={errors.entrancePrice ? classes.error : ""}
            />
          </div>

          <div className={classes.buttonContainer}>
            <Button type='submit' variant='solid'>
              Create Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
