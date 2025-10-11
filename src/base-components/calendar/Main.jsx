import { createRef, useEffect } from "react";
import { Calendar } from "@fullcalendar/core";
import PropTypes from "prop-types";

const init = (el, props) => {
    if (!el) return;

    const calendar = new Calendar(el, {
        ...props.options,
        events: [...(props.options.events || [])], // copy array to avoid mutation errors
    });

    calendar.render();
};

function Main(props) {
    const calendarRef = createRef();

    useEffect(() => {
        init(calendarRef.current, props);
    }, [props.options]); // rerender when options change

    return <div ref={calendarRef} className="full-calendar"></div>;
}

Main.propTypes = {
    options: PropTypes.object,
};

Main.defaultProps = {
    options: {},
};

export default Main;
