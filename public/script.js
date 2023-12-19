const socket = io();

$("#chat-box").hide();

document.querySelector("#send-btn").addEventListener("click", () => {
  const msgtxt = document.querySelector("#input").value;
  //   console.log(msgtxt);
  if(msgtxt<1){
    return
  }
  else{


      socket.emit("send-msg", {
        msg: msgtxt,
      }); // name of event and the data in obj
      document.querySelector("#input").value = "";
  }
});

socket.on("received-msg", (data) => {
  let { msg, username } = data;

  // document.querySelector('#chat').append(` <li class="border mb-2 p-2 rounded-pill " ><span class="fw-bold" >${id} </span>${msg.msg}</li>`)
  $("#chat").append(
    ` <li class="border mb-2 p-2 rounded-pill " ><span class="fw-bold" >${username} </span>${msg.msg}</li>`
  );
});

$("#login-btn").on("click", () => {
  // $('#chat-box').hide()
  const username = $("#username").val();
  socket.emit("login", {
    username: username,
  });
  $("#login").hide();
  $("#chat-box").show();
  $("#username").val(" ");
});
