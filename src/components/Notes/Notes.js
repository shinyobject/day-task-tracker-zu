import { useRef } from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  button {
    margin: 0;
    padding: 4px 8px;
  }
`;

export const Notes = styled(({ className }) => {
  const text = useRef(null);

  const handleSave = () => {
    const textToSave = text.current.value;
    const blob = new Blob([textToSave], { type: "text/plain" });
    // const a = document.createElement("a");
    // a.href = URL.createObjectURL(blob);
    // a.download = "notes.txt";
    // a.click();
    const writeFile = async () => {
      const root = await navigator.storage.getDirectory();
      const untitledFile = await root.getFileHandle("UntitledTest.txt", {
        create: true,
      });
      console.log(root, untitledFile);
    };

    //   writeFile();

    async function saveFile() {
      // create a new handle
      const newHandle = await window.showSaveFilePicker({
        suggestedName: "Temp Directory/Temp File.txt",
      });

      // create a FileSystemWritableFileStream to write to
      const writableStream = await newHandle.createWritable();

      const textToSave = text.current.value;
      const blob = new Blob([textToSave], { type: "text/plain" });
      // write our file
      await writableStream.write(blob);

      // close the file and write the contents to disk.
      await writableStream.close();
    }

    saveFile();
  };

  // var content = "What's up , hello world";
  // // any kind of extension (.txt,.cpp,.cs,.bat)
  // var filename = "hello.txt";

  // var blob = new Blob([content], {
  //   type: "text/plain;charset=utf-8",
  // });

  return (
    <div className={className}>
      <Row>
        <h2>Notes</h2>
        <button onClick={handleSave}>Save</button>
      </Row>
      <textarea ref={text}></textarea>
    </div>
  );
})`
  display: flex;
  flex-direction: column;
  textarea {
    font-family: Courier;
    font-size: 1rem;
    height: 250px;
    padding: 10px;
  }
`;
