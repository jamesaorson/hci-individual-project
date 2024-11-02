function capitalize(text) {
    console.log(text);
    console.log(String(text).charAt(0).toUpperCase() + String(text).slice(1));
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}

function drawSummary() {
    const isFollowing = document.getElementById("follow-input").checked;
    const isMuted = document.getElementById("mute-input").checked;
    const isBlocked = document.getElementById("block-input").checked;

    let you = [];
    let them = [];
    if (isFollowing) {
        you.push("can direct message them");
        you.push("will see their posts more frequently");
        them.push("can direct message me")
    } else {
        you.push("have access to direct messaging");
        them.push("have access to direct messaging");
    }
    if (isMuted) {
        you.push("will not see their activity on your feed");
        them.push("will not appear on your feed");
    } else {

    }
    if (isBlocked) {
        // summary.push("blocked");
    } else {

    }

    for (const [pro, proId] of [[you, "you-text"], [them, "them-text"]]) {
        let summaryText = '';
        if (pro.length > 2) {
            summaryText = pro.slice(0, pro.length - 1).join(', ') + `, and ${pro[pro.length - 1]}`;
        } else {
            summaryText = pro.join(' and ');
        }
        summaryText = capitalize(summaryText);

        summaryNode = document.getElementById(proId).innerHTML = summaryText;
    }
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
