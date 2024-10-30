function toggleDropdown(type) {
    const details = document.getElementById(type);
    details.style.display = (details.style.display === "none" || details.style.display === "") ? "block" : "none";
}

function changeCount(type, change) {
    const countElement = document.getElementById(type);
    let currentCount = parseInt(countElement.innerText);
    currentCount = Math.max(0, currentCount + change);
    countElement.innerText = currentCount;
}
