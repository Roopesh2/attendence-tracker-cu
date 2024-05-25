import { useState } from "react";
import {
  END_DATE_DIR,
  POPUP_BOX_SHADOW,
  START_DATE_DIR,
} from "../methods/consts";
import { Alert, Button, Col, Form } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import StorageManager from "../methods/StorageManager";

export default function TimeTable({ next, previous, close }) {
  const s = [
    parseInt(StorageManager.getCache(START_DATE_DIR)),
    parseInt(StorageManager.getCache(END_DATE_DIR)),
  ];
  const [startDate, setStartDate] = useState(
    isNaN(s[0]) ? new Date() : new Date(s[0]),
  );
  const [endDate, setEndDate] = useState(isNaN(s[1]) ? null : new Date(s[1]));
  const [error, setError] = useState(null);

  const validateDates = () => {
    console.log(endDate, startDate);
    if (!endDate || !startDate) {
      setError("Please provide start and end dates");
      return false;
    } else if (endDate < startDate) {
      setError("End date must be after start date");
      return false;
    }
    setError(null);
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateDates()) {
      // Handle form submission
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);
      StorageManager.setCache(START_DATE_DIR, startDate.getTime());
      StorageManager.setCache(END_DATE_DIR, endDate.getTime());
      next();
    }
  };

  const handlePrevious = () => {
    StorageManager.setCache(START_DATE_DIR, startDate?.getTime());
    StorageManager.setCache(END_DATE_DIR, endDate?.getTime());
    previous();
  };
  return (
    <div
      className="max-width daterange-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "0",
          boxShadow: POPUP_BOX_SHADOW,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 className="heading">Specify Duration of course</h2>
        <Form onSubmit={() => {}}>
          <Form.Group
            controlId="formStartDate"
            className="date-picker-container"
          >
            <Form.Label>Start Date: </Form.Label>
            <ReactDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="formEndDate" className="date-picker-container">
            <Form.Label>End Date :</Form.Label>
            <ReactDatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="form-control"
            />
          </Form.Group>
          <Col
            className="flex-inline-container"
            style={{
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button onClick={handlePrevious} variant="primary">
              Previous
            </Button>
            <Button onClick={handleNext} variant="primary">
              Next
            </Button>
            <Button variant="outline-primary" onClick={close}>
              Cancel
            </Button>
          </Col>
          {error && <Alert variant="danger">{error}</Alert>}
        </Form>
      </div>
    </div>
  );
}
