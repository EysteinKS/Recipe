import React, { Component } from "react";
import { FileUploader as Upload } from "react-firebase-file-uploader";
import { storage } from "../firebase/index";

class FileUpload extends Component {

    state = {
        photo: "",
        isUploading: false,
        progress: 0,
        photoURL: ""
    };
    
    handleUploadSuccess = filename => {
        this.setState({ photo: filename, progress: 100, isUploading: false });
        storage
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ photo: url }));
    };

    render(){
        const storageRef = storage.ref();

        return(
            <div>
                <form>
                    <label>Photo:</label>
                    {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                    {this.state.avatarURL && <img src={this.state.avatarURL} />}
                    <Upload
                        accept="image/*"
                        name="photo"
                        randomizeFilename
                        storageRef={storageRef}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                </form>
            </div>
        );
    }
}
 
export default FileUpload;