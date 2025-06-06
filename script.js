AOS.init();

// Register PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(() => {
    console.log("✅ Service Worker Registered");
  });
}

// Score Checker
async function checkScore() {
  const wallet = document.getElementById("walletInput").value.trim();
  if (!wallet) return alert("Enter wallet address.");

  try {
    // Verify address
    const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth");
    const ens = await provider.lookupAddress(wallet);

    const score = Math.floor(Math.random() * 100);
    const activity = ["Dormant", "Occasional", "Active", "Power User"];
    const level = activity[Math.floor(Math.random() * activity.length)];

    document.getElementById("scoreValue").textContent = score + "/100";
    document.getElementById("activityValue").textContent = level;
    document.getElementById("scoreArea").style.display = "block";
    document.getElementById("shareBtn").style.display = "inline-block";

    document.getElementById("shareBtn").onclick = () => {
      const tweet = `🧠 My ChainScore is ${score}/100!\nWallet: ${wallet}\nOnchain Activity: ${level}\n🔗 Check yours at: [your site link] #ChainScore #Web3`;
      const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
      window.open(twitterURL, '_blank');
    };

  } catch (err) {
    alert("Invalid wallet address.");
  }
}

// Theme toggle
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
