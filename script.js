const list = document.querySelector("#starred");

if (!list) {
  console.error("Starred list element not found.");
} else {
  fetch("events.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load events: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((events) => {
      if (!Array.isArray(events)) {
        throw new TypeError("Expected events.json to contain an array.");
      }

      list.innerHTML = "";

      if (events.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "No starred repositories found.";
        list.appendChild(emptyItem);
        return;
      }

      events.forEach((event) => {
        if (!event || typeof event.name !== "string" || typeof event.starred !== "string") {
          return;
        }

        const item = document.createElement("li");

        const link = document.createElement("a");
        link.href = `https://github.com/${event.name}`;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.textContent = event.name;

        const date = document.createElement("time");
        date.dateTime = event.starred;
        date.textContent = ` — starred ${event.starred}`;

        item.appendChild(link);
        item.appendChild(date);
        list.appendChild(item);
      });

      if (list.children.length === 0) {
        const fallbackItem = document.createElement("li");
        fallbackItem.textContent = "No valid starred repositories were found.";
        list.appendChild(fallbackItem);
      }
    })
    .catch((error) => {
      console.error("Unable to load starred repositories:", error);
      list.innerHTML = "<li>Unable to load starred repositories.</li>";
    });
}