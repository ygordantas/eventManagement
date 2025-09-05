import { useEffect, useMemo, useState } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import classes from "./MyEventFormPage.module.css";
import DRESS_CODE_TYPES from "../../../data/dressCodeTypes";
import Textarea from "../../../components/Textarea/Textarea";
import useAuthContext from "../../../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router";
import useAlertContext from "../../../hooks/useAlertContext";
import eventsServices from "../../../services/eventsServices";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";

const TODAY = new Date();

type EventFormData = {
  name: string;
  isOnline: boolean;
  isPrivate: boolean;
  date: string;
  address: string;
  dressCode?: string;
  entrancePrice?: number;
  maxCapacity?: number;
  minPeopleRequired?: number;
  description?: string;
};

const mapDateToISOString = (date: Date) => {
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, new Date().toISOString().lastIndexOf(":"));
};

export default function MyEventFormPage() {
  const { user } = useAuthContext();
  const { showSuccessAlert, showErrorAlert } = useAlertContext();
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    isOnline: false,
    isPrivate: false,
    date: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileOrPath, setFileOrPath] = useState<File | string | undefined>();

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        setIsLoading(true);

        const response = await eventsServices.getEventById(eventId!);

        if (!response) {
          showErrorAlert("Event with id provided was not found");
          navigate("/my-events");
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, createdAt, createdBy, date, hasImage, imagePath, ...form } =
          response!;

        setFormData({
          ...form,
          date: mapDateToISOString(date),
        });

        if (hasImage) {
          setFileOrPath(imagePath);
        }
      } catch (error) {
        showErrorAlert(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      getEventDetails();
    }
  }, [eventId, navigate, showErrorAlert]);

  const minDate = useMemo(() => mapDateToISOString(new Date()), []);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const file = fileOrPath instanceof File ? fileOrPath : undefined;

    try {
      setIsLoading(true);

      const {
        minPeopleRequired,
        entrancePrice,
        name,
        isOnline,
        isPrivate,
        address,
        dressCode,
        maxCapacity,
        description,
        date,
      } = formData;

      if (eventId) {
        await eventsServices.updateEvent(
          eventId,
          {
            date: new Date(date),
            entrancePrice,
            minPeopleRequired,
            name,
            isOnline,
            isPrivate,
            address,
            dressCode,
            maxCapacity,
            description,
            updatedAt: TODAY,
          },
          file
        );
      } else {
        await eventsServices.createEvent(
          {
            date: new Date(date),
            entrancePrice,
            minPeopleRequired,
            name,
            isOnline,
            isPrivate,
            address,
            dressCode,
            maxCapacity,
            description,
            createdBy: user!.id,
            createdAt: TODAY,
          },
          file
        );
      }
      showSuccessAlert(
        `Event ${eventId ? "updated" : "created"} successfully!`
      );

      navigate("/my-events");
    } catch (error) {
      showErrorAlert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={classes.container}>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className={classes.formWrapper}>
          <h1 className={classes.title}>
            {eventId ? "Edit" : "Create"} your event
          </h1>
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
                  type="datetime-local"
                  min={minDate}
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
                      entrancePrice: entryValue
                        ? Number(entryValue)
                        : undefined,
                    }));
                  }}
                />
              </div>
              <div className={classes.dressCodeContainer}>
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
              </div>
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
              <ImageUpload
                onChange={(f) => setFileOrPath(f)}
                fileOrPath={fileOrPath}
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
                {eventId ? "Update" : "Create"} Event
              </Button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
