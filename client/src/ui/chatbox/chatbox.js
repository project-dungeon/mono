const chatbox = document.getElementById("chatbox-content");
const chatboxForm = document.getElementById("chatbox-form");
const chatboxSendButton = document.getElementById("chatbox-send-button");

function addMessage({ author, message }) {
  const li = document.createElement("li");
  li.classList.add("chatbox-message");
  if (author) {
    const authorSpan = document.createElement("span");
    authorSpan.classList.add("chatbox-message-author");
    authorSpan.innerHTML = author;
    li.appendChild(authorSpan);
  }
  const messageSpan = document.createElement("span");
  messageSpan.classList.add("chatbox-message-content");
  messageSpan.innerHTML = message;
  li.appendChild(messageSpan);
  chatbox.appendChild(li);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function onSubmit() {
  const message = document.getElementById("chatbox-input").value;
  if (!message) {
    return;
  }
  dispatchEvent(
    new CustomEvent("__PDG__chat-sent", {
      detail: { message },
    })
  );
  document.getElementById("chatbox-input").value = "";
  document.getElementById("chatbox-input").blur();
}

chatboxForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit();
});

chatboxSendButton.addEventListener("click", () => {
  onSubmit();
});

window.addEventListener("__PDG__chat-received", (e) => {
  addMessage(e.detail);
});

// on enter press, focus chatbox
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("chatbox-input").focus();
  }
});
