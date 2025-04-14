import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar"; // Import View type
import { format, parse, startOfWeek, getDay, addMinutes } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getTrainings } from "../ptapi";
import { enUS } from "date-fns/locale/en-US";
import { CalendarEvent } from "../types";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export default function PtCalendar() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<View>("month"); // Use View type for state

    useEffect(() => {
        // Fetch training data from the API and formats it for the calendar
        getTrainings()
            .then((trainings) => {
                const formattedEvents = trainings.map((training) => {
                    const startTime = new Date(training.date);
                    const endTime = addMinutes(startTime, training.duration);

                    return {
                        title: `${training.customer.firstname} ${training.customer.lastname} - ${training.activity}`,
                        start: startTime,
                        end: endTime,
                    };
                });
                setEvents(formattedEvents);
            })
            .catch((err) => console.error("Error fetching trainings:", err));
    }, []);

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={["month", "week", "day", "agenda"]}
                date={currentDate}
                onNavigate={(date) => setCurrentDate(date)}
                view={currentView} // Correctly typed view
                onView={(view) => setCurrentView(view)} // Correctly typed view change
                style={{ height: 500, marginTop: "25px" }}
            />
        </div>
    );
}