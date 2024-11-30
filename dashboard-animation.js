document.addEventListener("DOMContentLoaded", main);

function main() {
  let prices = [
    11922, 12186, 12554, 12177, 12009, 12296, 12182, 11942, 12314, 11231, 11606,
    12449, 11841, 11622, 12731, 11724, 11159, 11211, 12344, 12897, 11136, 12941,
    11228, 12756, 11274, 11502, 11563, 12266, 12213, 12205,
  ];
  createGoldPricesChart(
    "chart-gold-container-canva",
    "gold",
    "rgba(255, 215, 0, 0.2)",
    prices,
    'الذهب'
  );
  createGoldPricesChart(
    "chart-silver-container-canva",
    "silver",
    "rgb(214, 221, 221,0.4)",
    prices,"الفضة"
  );
  draw_spider_web_graph();
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

function createGoldPricesChart(chartId, color1, color2, prices,title) {
  const ctx = document.getElementById(chartId).getContext("2d");
  const goldPricesChart = new Chart(ctx, {
    type: "line", // Line chart
    data: {
      labels: Array.from({ length: prices.length }, (_, i) => `${i + 1}`), // Labels for each day
      datasets: [
        {
          label: title,
          data: prices,
          borderColor: color1, // Line color
          backgroundColor: color2, // Fill color
          borderWidth: 2,
          fill: true, // Fill area under the line
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false, // Start Y-axis from zero
          title: {
            display: true,
            text: "سعر", // Y-axis title
          },
        },
        x: {
          title: {
            display: true,
            text: "أيام", // X-axis title
          },
        },
      },
    },
  });
}

function draw_spider_web_graph() {
  const ctx = document.getElementById("spider-graph-canvas").getContext("2d");
  const chartData = {
    labels: ["جديد", "قديم", "محطم", "جملة"],
    datasets: [
      {
        label: "ذهب",
        data: [40, 30, 20, 10],
        backgroundColor: "rgba(255, 215, 0, 0.3)",
        borderColor: "rgba(255, 215, 0, 0.9)",
        pointBackgroundColor: "rgba(255, 215, 0, 1)",
        pointBorderColor: "rgba(255, 215, 0, 1)",
      },
      {
        label: "فضة",
        data: [70, 10, 20, 90],
        backgroundColor: "rgba(192, 192, 192, 0.3)",
        borderColor: "rgba(192, 192, 192, 0.9)",
        pointBackgroundColor: "rgba(192, 192, 192, 1)",
        pointBorderColor: "rgba(192, 192, 192, 1)",
      },
    ],
  };

  new Chart(ctx, {
    type: "radar",
    data: chartData,
    options: {
      plugins: {
        title: {
          display: true,
          text: "",
          position: "top",
          align: "start",
        },
        legend: {
          position: "bottom",
          align: "start",
        },
      },
      scale: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  });
}
