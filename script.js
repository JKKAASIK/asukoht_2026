const form = document.getElementById("guessForm");
const message = document.getElementById("message");



// example secret targets
const vastus_X = 58.359231;
const vastus_Y = 26.732391;

// how many hours between submissions
const cooldownHours = 1;

function canSubmit() {
  const last = localStorage.getItem("lastSubmit");
  if (!last) return { allowed: true };

  const elapsedMs = Date.now() - Number(last);
  const remainingMs = cooldownHours * 60 * 60 * 1000 - elapsedMs;

  if (remainingMs > 0) {
    return {
      allowed: false,
      remainingMs,
    };
  } else {
    return { allowed: true };
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const check = canSubmit();
  if (!check.allowed) {
    const minutes = Math.floor(check.remainingMs / 60000);
    const seconds = Math.floor((check.remainingMs % 60000) / 1000);
    message.textContent = `You can submit again in ${minutes} min ${seconds} sec.`;
    message.style.color = "red";
    return;
  }

  const g1 = Number(document.getElementById("guess1").value);
  const g2 = Number(document.getElementById("guess2").value);
  const g3 = Number(document.getElementById("guess3").value);
  const g4 = Number(document.getElementById("guess4").value);

  function approxDistance(lat1, lon1, lat2, lon2) {
    const latRad = lat1 * Math.PI / 180;

    const dx = (lon2 - lon1) * Math.cos(latRad);
    const dy = (lat2 - lat1);

    return Math.sqrt(dx*dx + dy*dy);
}

  // compare each row
  const kaugus_1 = approxDistance((g1,g2,vastus_X,vastus_Y);
  const kaugus_2 = approxDistance((g3,g4,vastus_X,vastus_Y);
  if (kaugus_1 < kaugus_2) {
    message.textContent = "I asukoht on lähemal kui II";
    message.style.color = "green";
  }
  if (kaugus_1 > kaugus_2) {
    message.textContent = "II asukoht on lähemal kui I";
    message.style.color = "green";
  }

  localStorage.setItem("lastSubmit", Date.now());
  form.reset();
});
