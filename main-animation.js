document.addEventListener("DOMContentLoaded", main);

function main() {
  sid_bar_disply();

  mainContainer_controler("./dashboard.html");

  document
    .getElementById("dashboard-btn-sidebar")
    .addEventListener("click", () => {
      mainContainer_controler("./dashboard.html");
    });

  document
    .getElementById("side-bar-inventory-bt")
    .addEventListener("click", () => {
      mainContainer_controler("./main_inventory.html");
    });
  document
    .getElementById("expand-inventory-btn")
    .addEventListener("click", () => {
      expend_arrow_animation(
        "expand-inventory-btn",
        "sidebar-menu-submenu_Inventory"
      );
    });

  document
    .getElementById("sidebar_groups_btn")
    .addEventListener("click", () => {
      mainContainer_controler("./main_groups_management.html");
    });

  document
    .getElementById("AddNewProduct-sidebarmenu")
    .addEventListener("click", openDialogAddNewProduct);

  document
  .getElementById('showSales_sidbarMenu')
  .addEventListener('click',() =>{
    mainContainer_controler("./main_sales.html");
  });

}

function sid_bar_disply() {
  const sidebar = document.getElementById("menu_side_bar_dashboard");
  const menuButton = document.getElementById("button_menu_dashboard");
  const mainContainer = document.getElementById("main-container");

  menuButton.addEventListener("click", () => {
    if (sidebar.classList.contains("hidden")) {
      sidebar.classList.remove("hidden");
      mainContainer.classList.remove("full-width");
    } else {
      sidebar.classList.add("hidden");
      mainContainer.classList.add("full-width");
    }
  });
}

function mainContainer_controler(source) {
  const mainContainer = document.getElementById("main-container");
  const progress_loader = document.getElementById("progress_loader");
  mainContainer.src = source;
  mainContainer.addEventListener("load", function () {
    progress_loader.style.display = "none";
    mainContainer.style.display = "block";
  });
}

function expend_arrow_animation(arrow_tag_id, submenu_tag_id) {
  const expend_arrow = document.getElementById(arrow_tag_id);
  const submenu = document.getElementById(submenu_tag_id);

  if (expend_arrow.getAttribute("data-set.oriantation") === "1") {
    expend_arrow.classList.add("expand-button-rotate-down");
    submenu.parentNode.classList.add("sidebar-menu-submenu-focus");
    expend_arrow.setAttribute("data-set.oriantation", "0");
    submenu.classList.add("show");
  } else {
    expend_arrow.classList.remove("expand-button-rotate-down");
    submenu.parentNode.classList.remove("sidebar-menu-submenu-focus");
    expend_arrow.setAttribute("data-set.oriantation", "1");
    submenu.classList.remove("show");
  }
}

// Function to open the dialog to add new product
function openDialogAddNewProduct() {
  if (!document.getElementById("dialogOverlayAddNewProduct")) {
    // Load dialog HTML dynamically
    fetch("./add_new_product.html")
      .then((response) => response.text())
      .then((data) => {
        document.body.insertAdjacentHTML("beforeend", data);
        const dialog = document.getElementById("dialogOverlayAddNewProduct");
        dialog.style.display = "flex";
        initializeImageHandling(); // Initialize after adding to DOM
      })
      .catch((error) => console.error("Error loading dialog HTML:", error));
  } else {
    document.getElementById("dialogOverlayAddNewProduct").style.display =
      "flex";
  }

  // Load CSS
  if (!document.querySelector("link[href='add_new_product.css']")) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "add_new_product.css";
    document.head.appendChild(link);
  }
}
function closeDialog() {
  const dialog = document.getElementById("dialogOverlayAddNewProduct");
  if (dialog) {
    dialog.style.display = "none";
  }
}

function initializeImageHandling() {
  const imageUploadSection = document.querySelector(".image-upload-section");
  const imageInput = document.getElementById("image_path");
  const imagePreview = document.querySelector(".image-preview");
  const uploadPlaceholder = document.querySelector(".upload-placeholder");

  // Drag and drop handlers
  imageUploadSection.addEventListener("dragover", handleDragOver);
  imageUploadSection.addEventListener("dragleave", handleDragLeave);
  imageUploadSection.addEventListener("drop", handleDrop);

  // File input change handler
  imageInput.addEventListener("change", handleFileSelect);

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    imageUploadSection.classList.add("drag-over");
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    imageUploadSection.classList.remove("drag-over");
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    imageUploadSection.classList.remove("drag-over");

    const files = e.dataTransfer.files;
    handleFiles(files);
  }

  function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
  }

  function handleFiles(files) {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Please upload image files only");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        createImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
  function createImagePreview(src) {
    const wrapper = document.createElement("div");
    wrapper.className = "image-preview-wrapper";

    const img = document.createElement("img");
    img.src = src;
    img.alt = "Product preview";

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-image";
    removeBtn.innerHTML = "×";
    removeBtn.onclick = function () {
      wrapper.remove();
      // Show placeholder if no images left
      if (imagePreview.children.length === 0) {
        document.querySelector(".upload-placeholder").style.display = "block";
      }
    };

    wrapper.appendChild(img);
    wrapper.appendChild(removeBtn);
    imagePreview.appendChild(wrapper);

    // Hide placeholder when images are present
    document.querySelector(".upload-placeholder").style.display = "none";
  }
}
