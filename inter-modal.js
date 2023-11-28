// Get the modal element and the button that opens it
const interModal = document.getElementById("interModal");
const openModalBtn = document.getElementById("openModalBtn");

openModalBtn.addEventListener("click", () => {
  interModal.style.display = "block";
  // Clear previous content
  document.getElementById("interModalContent").innerHTML = `
      <iframe src="https://stellar-hummingbird-6ceec4.netlify.app/" frameborder="0" style="width: 98%; height: 100%; position: absolute; top: 0; left: 0;"></iframe>
    `;
});

openModalBtn2.addEventListener("click", () => {
  interModal.style.display = "block";
  // Clear previous content
  document.getElementById("interModalContent").innerHTML = `
      <iframe src="https://amazing-arithmetic-10d027.netlify.app/" frameborder="0" style="width: 98%; height: 100%; position: absolute; top: 0; left: 0;"></iframe>
    `;
});

// Close the modal when the close button (×) is clicked
document.querySelector(".closeIM").addEventListener("click", () => {
  interModal.style.display = "none";
});

// Close the modal when the user clicks outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === interModal) {
    interModal.style.display = "none";
  }
});
