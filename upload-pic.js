document.addEventListener("DOMContentLoaded", function () {
  const uploadImage = document.getElementById("pic-upload");
  const fileInput = document.getElementById("fileInput");

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
        // Add any success handling code here
      },
      error: function (err) {
        console.error("Error uploading:", err);
        // Add any error handling code here
      },
    });
  });
});
//kmk