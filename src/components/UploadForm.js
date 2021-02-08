import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";

import "./App.css";

function UploadForm() {
  const [fileName, setFileName] = useState(null);
  const [percent, uploadPercentage] = useState(0);

  const handleChange = (e) => {
    setFileName(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const storageRef = projectStorage
      .storage()
      .ref("vacation/" + fileName.name);
    const uploadTask = storageRef.put(fileName);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploadPercentage(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case projectStorage.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case projectStorage.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.error(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <div className="mt-3">
          <Form.Group>
            <Form.File
              className="position-relative"
              required
              name="file"
              label="Image File"
              onChange={handleChange}
              id="validationFormik107"
            />
          </Form.Group>
          <Button type="submit">Upload Image</Button>
        </div>
      </Form>
      <br></br>
      <ProgressBar now={percent} />
    </>
  );
}

export default UploadForm;
