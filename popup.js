document.addEventListener("DOMContentLoaded", function () {
  // Open chat in new tab
  const checkbox = document.getElementById("openInNewTab");
  checkbox.checked = JSON.parse(localStorage.getItem("openInNewTab")) || false;

  function updateCheckboxState() {
    localStorage.setItem("openInNewTab", checkbox.checked);
  }
  checkbox.addEventListener("change", updateCheckboxState);

  let listItems = document.querySelectorAll("li");
  listItems.forEach((li) => {
    li.addEventListener("click", function (event) { 
      let website = this.getAttribute("data-website");

      if (checkbox.checked) {
        chrome.tabs.create({ url: website });
      } else {
        event.preventDefault();

        chrome.windows.create({
          url: website,
          type: 'panel',
          width: 700,
          height: 700,
          left: 0,
          top: 10
        });
      }
    });
  });
});
