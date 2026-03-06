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

  // compare each row
  const kaugus_1 = ((g1 - vastus_X) ** 2 + (g2 - vastus_Y) ** 2) ** (1 / 2);
  const kaugus_2 = ((g3 - vastus_X) ** 2 + (g4 - vastus_Y) ** 2) ** (1 / 2);
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
