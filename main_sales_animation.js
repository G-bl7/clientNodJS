document.addEventListener("DOMContentLoaded", main);

function main() {
  document
    .getElementById("expand-sales-filter-btn")
    .addEventListener("click", () => {
      expend_arrow_animation("expand-sales-filter-btn", "advanced-filter-sales");
    });
}

function expend_arrow_animation(arrow_tag_id, submenu_tag_id) {
  const expend_arrow = document.getElementById(arrow_tag_id);
  const submenu = document.getElementById(submenu_tag_id);

  if (expend_arrow.getAttribute("data-set.oriantation") === "1") {
    document.getElementsByClassName("table-container")[0].style.height = "85vh";
    expend_arrow.setAttribute("data-set.oriantation", "0");
    expend_arrow.src = "./icons/chevron-down.png"
    submenu.style.display = "flex";
  } else {
    document.getElementsByClassName("table-container")[0].style.height = "90vh";
    expend_arrow.setAttribute("data-set.oriantation", "1");
    expend_arrow.src = "./icons/chevron-left.png"
    submenu.style.display = "none";
  }
}
