document.addEventListener("DOMContentLoaded", function () {
  const uploadImage = document.getElementById("pic-upload");
  const fileInput = document.getElementById("fileInput");

  let uploadedImageUrl = ''; // Variable to store uploaded image URL

  uploadImage.addEventListener("click", function () {
    fileInput.click(); // Trigger click on file input when image is clicked
  });

  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    reqwest({
      url: "https://photos-api-mzpl.onrender.com/upload",
      method: "POST",
      processData: false,
      data: formData,
      success: function (response) {
        console.log("Upload successful:", response);
        // Assuming response contains the image URL, update the variable
        uploadedImageUrl = response; // Update the variable with the image URL
        console.log("Uploaded Image URL:", uploadedImageUrl);
        // Add any success handling code here
      },
      error: function (err) {
        console.error("Error uploading:", err);
        // Add any error handling code here
      },
    });
  });
});
