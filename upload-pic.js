document.getElementById("pic-upload").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  fileInput.click(); // Trigger click on the file input

  fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("photo", file);

      try {
        const response = await fetch(
          "https://photos-api-mzpl.onrender.com/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          alert("File uploaded successfully!");
          const imageUrl = await response.text(); // Assuming the server returns the image URL
          console.log("Uploaded Image URL:", imageUrl);
          // You can store or use the imageUrl as needed
        } else {
          const errorMessage = await response.text();
          alert(`Failed to upload file: ${errorMessage}`);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("An error occurred while uploading the file.");
      }
    } else {
      alert("Please select a file to upload.");
    }
  });
});
