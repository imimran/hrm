import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { apiBaseUrl } from "../config/apiConfig";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

function CSVUploadScreen() {
  const [fileError, setFileError] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();

  const onDrop = (acceptedFiles) => {
    let data = new FormData();
    data.append("file", acceptedFiles[0]);
    console.log(acceptedFiles[0].type);

    if (acceptedFiles[0].type !== "text/csv") {
      setFileError(true);
      return false;
    } else {
      setFileError(false);
    }

    Axios.post(apiBaseUrl + "/api/v1/employee/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response);
        if (response && response.data && response.data.success) {
          let message =
            response.data.success +
            (response.data.failed ? " and " + response.data.failed : "");
          alert.success(message);
        }
        navigate("/employee-list");
      })
      .catch((error) => {
        console.log(error);
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.failed
        ) {
          alert.error(error.response.data.failed);
        }
      });
  };

  return (
    <div className="card card-body p-5 m-5 col-lg-6 mx-auto bg-gray">
      <h5> Create Employee by Upload CSV file </h5>
      <Dropzone
        // accept={[".csv"]}
        onDrop={(acceptedFiles) => {
          onDrop(acceptedFiles);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />

            <div class="mb-3">
              <p>Dropping files here, or click to select files to upload.</p>
            </div>
            {fileError && (
              <div className="error-message" style={{ color: "red" }}>
                Upload Only CSV file
              </div>
            )}
          </div>
        )}
      </Dropzone>
    </div>
  );
}
export default CSVUploadScreen;
