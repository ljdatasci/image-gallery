import { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

//import beach1 from "./images/anthony-ingham-beach1-unsplash.jpg";
import "./App.css";
const firebaseConfig = {
  apiKey: "AIzaSyDOMKYSypZPjnslt0tAEs_4kHBe_E4MfgM",
  authDomain: "image-gallery-93486.firebaseapp.com",
  projectId: "image-gallery-93486",
  storageBucket: "image-gallery-93486.appspot.com",
  messagingSenderId: "201867296521",
  appId: "1:201867296521:web:78150c53cf14643de99dd8",
  measurementId: "G-KDXJWNDHDC",
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
