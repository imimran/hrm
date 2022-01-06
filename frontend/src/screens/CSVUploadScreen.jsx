import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { apiBaseUrl } from "../config/apiConfig";

function CSVUploadScreen() {
  const [fileError, setFileError] = useState(false);

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
      })
      .catch((error) => {
        console.log(error);
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
