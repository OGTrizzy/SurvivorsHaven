const tokenUrl =
  "https://api.dexscreener.com/token-pairs/v1/solana/gzowf32zjf22bh3j8rkckv6q7fgwxlapacjqyqhhmoon";

async function fetchTokenomics() {
  try {
    const response = await fetch(tokenUrl);
    if (!response.ok) {
      throw new Error("Tokenomics data could not be retrieved");
    }

    const data = await response.json();

    const tokenData = data[0];
    const price = tokenData?.priceUsd || "N/A";
    const volume24h = tokenData?.volume?.h24 || "N/A";
    const priceChange24h = tokenData?.priceChange?.h24 || "N/A";
    const marketCap = tokenData?.fdv || "N/A";

    updateUI(price, volume24h, priceChange24h, marketCap);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function updateUI(price, volume24h, priceChange24h, marketCap) {
  document.getElementById("price").textContent = `Price: $${price}`;
  document.getElementById(
    "volume24h"
  ).textContent = `24h Volume: $${volume24h}`;
  document.getElementById(
    "priceChange24h"
  ).textContent = `Price Change (24h): ${priceChange24h}%`;
  document.getElementById(
    "marketCap"
  ).textContent = `Market Cap: $${marketCap}`;
}

fetchTokenomics();
