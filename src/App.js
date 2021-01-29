import { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import "./App.css";
const firebaseConfig = {
  //add your credentials here
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function ImageForm() {
  const [fileName, setFileName] = useState(null);

  const handleChange = (e) => {
    setFileName(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const storageRef = firebase.storage().ref("vacation/" + fileName.name);
    const uploadTask = storageRef.put(fileName);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
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
  );
}

function App() {
  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <Container>
        <ImageForm />
      </Container>
    </div>
  );
}

export default App;
