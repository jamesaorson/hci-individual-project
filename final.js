function capitalize(text) {
    console.log(text);
    console.log(String(text).charAt(0).toUpperCase() + String(text).slice(1));
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}

function drawSummary() {
    const isFollowing = document.getElementById("follow-input").checked;
    const isMuted = document.getElementById("mute-input").checked;
    const isBlocked = document.getElementById("block-input").checked;

    let summary = [];
    if (isFollowing) {
        summary.push("following");
    } else {

    }
    if (isMuted) {
        summary.push("muted");
    } else {

    }
    if (isBlocked) {
        summary.push("blocked");
    } else {

    }

    let summaryText = '';
    if (summary.length > 2) {
        summaryText = summary.slice(0, summary.length - 1).join(', ') + `, and ${summary[summary.length - 1]}`;
    } else {
        summaryText = summary.join(' and ');
    }
    summaryText = capitalize(summaryText);

    const summaryNode = document.getElementById("summary-text").innerHTML = summaryText;
}

document.onreadystatechange = (event) => {
    if (document.readyState !== "complete") {
        return;
    }

    drawSummary();
    for (const inputId of ["follow-input", "mute-input", "block-input"]) {
        const input = document.getElementById(inputId);
        input.onchange = drawSummary;
    }
};
