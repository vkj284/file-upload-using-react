import {useState} from "react";
import './App.css';

function App() {
  const [selectedFile,setSelectedFile] = useState();
  const [fileLink,setFileLink] = useState();

  const handleFile = (e) =>{
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile)
  }
  const handleUpload=()=>{
    const fileData = new FormData();
    fileData.append('file',selectedFile);

    fetch("https://file.io/?expires=5d",{
      method: 'POST',
      body: fileData,
    }).then(res=>res.json())
    .then(result => {console.log(result); setFileLink(result.link)});
  }
  return (
    <div className="App">
      <div className="upload-container">
        <div className="file-details">
          {selectedFile ? selectedFile.name : "Please select a file to upload" }
        </div>
      <label htmlFor="fileUpload" className="file-upload">Select file</label>
      <input type="file" name="fileUpload" id="fileUpload" onChange={handleFile} />
      <button onClick={handleUpload} className="upload-btn">Upload file</button>
     { fileLink ? <div className="file-link">
        File uploaded. Your file link is: {fileLink}
      </div> : ""}
      </div>
    </div>
  );
}

export default App;
