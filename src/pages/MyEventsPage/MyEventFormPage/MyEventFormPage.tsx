import { useMemo, useState } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import classes from "./MyEventFormPage.module.css";
import DRESS_CODE_TYPES from "../../../data/dressCodeTypes";
import TIMEZONES from "../../../data/timezones";
import Textarea from "../../../components/Textarea/Textarea";
import { getDateOnlyString } from "../../../utils/dateUtils";
import useAuthContext from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router";
import useAlertContext from "../../../hooks/useAlertContext";
import eventServices from "../../../services/eventServices";

const TODAY = new Date();

type EventFormData = {
  name: string;
  isOnline: boolean;
  isPrivate: boolean;
  date: string;
  time: string;
  timezoneCode: string;
  address: string;
  dressCode?: string;
  entrancePrice?: number;
  maxCapacity?: number;
  minPeopleRequired?: number;
  description?: string;
};

export default function MyEventFormPage() {
  const { user } = useAuthContext();
  const { showSuccessAlert } = useAlertContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    isOnline: false,
    isPrivate: false,
    date: "",
    time: "",
    timezoneCode: "",
    address: "",
  });

  const getMinDate = useMemo(() => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 1);
    return getDateOnlyString(minDate);
  }, []);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    eventServices.createEvent({
      ...formData,
      id: crypto.randomUUID(),
      createdBy: user!.id,
      createdAt: TODAY,
    });

    showSuccessAlert("Event created successfully!");

    navigate("/my-events");
  };

  return (
    <section className={classes.container}>
      <div className={classes.formWrapper}>
        <h1 className={classes.title}>Create your event</h1>
        <form onSubmit={onSubmitHandler} className={classes.form}>
          <div className={classes.section}>
            <h2 className={classes.sectionTitle}>Event Details</h2>

            <Input
              required
              label="Event Name"
              value={formData.name}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />

            <div className={classes.checkboxGroup}>
              <Input
                type="checkbox"
                label="Make it an online event"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    isOnline: e.target.checked,
                    address: "",
                  }));
                }}
                checked={formData.isOnline}
              />

              <Input
                type="checkbox"
                label="Make it a private event"
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    isPrivate: e.target.checked,
                  }));
                }}
                checked={formData.isPrivate}
              />
            </div>

            <Input
              label={formData.isOnline ? "Link URL" : "Address"}
              type={formData.isOnline ? "url" : "text"}
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
                min={getMinDate}
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

            <Select
              label="Timezone"
              value={formData.timezoneCode}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  timezoneCode: e.target.value,
                }))
              }
              required
              options={TIMEZONES}
            />

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

            <div className={classes.descriptionContainer}>
              <Textarea
                label={"Description"}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
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
