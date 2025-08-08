import { useState } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import classes from "./MyEventFormPage.module.css";
import EVENT_TYPES from "../../../data/eventTypes";
import DRESS_CODE_TYPES from "../../../data/dressCodeTypes";

type EventFormData = {
  evenTypeCode: string;
  date: string;
  time: string;
  timezone: string;
  address: string;
  dressCode?: string;
  entrancePrice?: number;
  maxCapacity?: number;
  minPeopleRequired?: number;
};

export default function MyEventFormPage() {
  const [formData, setFormData] = useState<EventFormData>({
    evenTypeCode: "",
    date: "",
    time: "",
    timezone: "",
    address: "",
  });

  const onSubmitHandler = () => {};

  return (
    <section className={classes.container}>
      <div className={classes.formWrapper}>
        <h1 className={classes.title}>Create your event</h1>
        <form onSubmit={onSubmitHandler} className={classes.form}>
          <div className={classes.section}>
            <h2 className={classes.sectionTitle}>Event Details</h2>
            <Select
              label="Event Type"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  evenTypeCode: e.target.value,
                }));
              }}
              value={formData.evenTypeCode}
              options={EVENT_TYPES}
              required
            />

            <Input
              label={
                formData.evenTypeCode === "online" ? "Link URL" : "Address"
              }
              type="text"
              value={formData.address ?? ""}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  address: e.target.value,
                }));
              }}
              required
              placeholder="Enter event address"
            />

            <div className={classes.row}>
              <Input
                label="Date"
                type="date"
                required
                value={formData.date}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }));
                }}
              />
              <Input
                label="Time"
                type="time"
                required
                value={formData.time}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    time: e.target.value,
                  }));
                }}
              />
            </div>

            <Select label="Timezone" required options={[]} />
            <Select
              label="Dress Code"
              value={formData.dressCode ?? ""}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  dressCode: e.target.value,
                }));
              }}
              options={DRESS_CODE_TYPES}
            />

            <Input
              label="Entrance Price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={formData.entrancePrice ?? ""}
              onChange={(e) => {
                const entryValue = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  entrancePrice: entryValue ? Number(entryValue) : undefined,
                }));
              }}
            />
          </div>

          <div className={classes.section}>
            <h2 className={classes.sectionTitle}>Capacity</h2>
            <div className={classes.row}>
              <Input
                label="Maximum Capacity"
                type="number"
                min="1"
                value={formData.maxCapacity ?? ""}
                onChange={(e) => {
                  const entryValue = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    maxCapacity: entryValue ? Number(entryValue) : undefined,
                  }));
                }}
              />
              <Input
                label="Minimum Attendance"
                type="number"
                min="1"
                value={formData.minPeopleRequired ?? ""}
                onChange={(e) => {
                  const entryValue = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    minPeopleRequired: entryValue
                      ? Number(entryValue)
                      : undefined,
                  }));
                }}
              />
            </div>
          </div>

          <div className={classes.buttonContainer}>
            <Button type="submit" variant="solid">
              Create Event
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
