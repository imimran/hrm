import React, { useState } from "react";
import Axios from "axios";
import { Form, Button } from "react-bootstrap";
import { apiBaseUrl } from "../config/apiConfig";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

function AddEmployeeScreen() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const alert = useAlert();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEmployeeSubmit = (values) => {
    console.log("values", values);

    const userData = new FormData();
    userData.append("first_name", values.first_name ? values.first_name : "");
    userData.append("last_name", values.last_name ? values.last_name : "");
    userData.append("email", values.email ? values.email : "");

    Axios.post(apiBaseUrl + "/api/v1/employee/create", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response);
        if (response && response.data && response.data.msg) {
          alert.success(response.data.msg);
        }
        navigate("/employee-list");
      })
      .catch((error) => {
        console.log(error);
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.msg
        ) {
          alert.error(error.response.data.msg);
        }
      });
  };

  return (
    <>
      <Form
        className="card card-body p-5 m-5 col-lg-6 mx-auto"
        onSubmit={handleSubmit(handleEmployeeSubmit)}
      >
        <h5> Add New Employee </h5>
        <Form.Group controlId="message">
          <Form.Label> First Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            defaultValue={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            className={errors.first_name && "is-invalid"}
            {...register("first_name", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {errors.first_name && (
            <span className="text-danger">
              {errors.first_name.type === "required" &&
                "Please give first_name"}
              {errors.first_name.type === "minLength" &&
                "Please give first_name minimum of 5 characters"}
              {errors.first_name.type === "maxLength" &&
                "Please give first_name maximum of 50 characters"}
            </span>
          )}
        </Form.Group>

        <Form.Group controlId="message">
          <Form.Label> Last Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            defaultValue={last_name}
            onChange={(e) => setLastName(e.target.value)}
            className={errors.last_name && "is-invalid"}
            {...register("last_name", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {errors.last_name && (
            <span className="text-danger">
              {errors.last_name.type === "required" && "Please give last_name"}
              {errors.last_name.type === "minLength" &&
                "Please give last_name minimum of 3 characters"}
              {errors.last_name.type === "maxLength" &&
                "Please give last_name maximum of 50 characters"}
            </span>
          )}
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email Address"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email && "is-invalid"}
            {...register("email", {
              required: "required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Enter a valid e-mail address",
              },
            })}
          />
          {errors.email && (
            <span className="text-danger">
              {errors.email.type === "required" && "Please give email address"}
              {errors.email.type === "pattern" &&
                "Please give a valid email address"}
            </span>
          )}
        </Form.Group>

        <br />
        <Button type="submit" variant="primary">
          Create Employee
        </Button>
      </Form>
    </>
  );
}

export default AddEmployeeScreen;
