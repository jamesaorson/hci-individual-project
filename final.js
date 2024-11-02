const username = `<pre class="username"><a href="https://x.com/contextdogs/">@contextdogs</a></pre>`;

function capitalize(text) {
    console.log(text);
    console.log(String(text).charAt(0).toUpperCase() + String(text).slice(1));
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}

function drawSummary(event) {
    const followInput = document.getElementById("follow-input");
    const blockInput = document.getElementById("block-input");

    if (followInput.checked && blockInput.checked) {
        followInput.checked = false;
        if (event.srcElement.id === "follow-input") {
            return false;
        }
    }

    const isFollowing = followInput.checked;
    const isMuted = document.getElementById("mute-input").checked;
    const isBlocked = blockInput.checked;
    followInput.disabled = isBlocked;

    let you = [];
    let them = [];
    if (isFollowing) {
        you.push(`can direct message ${username}`);
        if (!isMuted) {
            you.push(`will more frequently see ${username}'s activity on your feed`);
        }
        them.push("can direct message you")
    } else if (isBlocked) {
        if (!you.includes(`cannot direct message ${username}`)) {
            you.push(`cannot direct message ${username}`);
            them.push("cannot direct message you");
        }
        you.push(`will not see ${username}'s activity on your feed`);
        you.push(`can see ${username}'s activity by going directly to their profile`);
        them.push("can still see your activity");
    } else {
        you.push(`cannot direct message ${username}`);
        them.push("cannot direct message you");
    }
    if (isMuted) {
        if (isFollowing) {
            you.push("will not receive notifications for direct messages")
        }
        if (!you.includes(`will not see ${username}'s activity on your feed`)) {
            you.push(`will not see ${username}'s activity on your feed`);
        }
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
