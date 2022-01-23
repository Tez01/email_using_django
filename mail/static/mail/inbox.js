document.addEventListener('DOMContentLoaded', function() {
  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
  
  
  // Get values from of all the fields after submit is clicked()
  document.querySelector("#compose-form").onsubmit = function(){
    try {
      document.querySelector('#message').remove();  
    }
    catch (exception_var) {
      console.log("No message was found")
    }
    let recipients = document.querySelector("#compose-recipients").value;
    let subject = document.querySelector("#compose-subject").value;
    let body = document.querySelector("#compose-body").value;

    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
      })
    })
    .then(response => response.json())
    .then(result=>{
      const element = document.createElement('div');
      element.setAttribute("id", "message")
      if(result["message"] === "Email sent successfully."){
          element.style.color = "green";
          element.innerHTML = result["message"];
      }
      else{
          element.style.color = "red";
          element.innerHTML = result["error"];
      }
      document.querySelector("#compose-view").append(element);    


      // TODO: Tej : This code needs improvement
      // let myVar = setInterval(()=>{
      //   let messages = document.querySelectorAll(".message")
      //   for(let i = 0; i < messages.length; i++){
      //     messages[i].remove();
      //   }
      //   clearInterval(myVar);
            
      //   }, 2000);
        
    })
    .catch(error => {
      console.log('Error:', error);
    });
    return false;
  };
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  
  if(mailbox === "inbox"){
    fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      result.forEach(email => {
        console.log(email);
        // const element = document.createElement('div');
        
      });
    });
  }
  else if(mailbox === "sent"){
    fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      result.forEach(email => {
        console.log(email);
        const element = document.createElement('div');
        // Add event listener for click
        element.addEventListener('click', )
        if(email["read"] === true){
          element.setAttribute("class", "p-3 mb-2 bg-secondary text-white");

        }
        else{
          element.setAttribute("class", "p-3 mb-2 bg-light text-dark");

        }
        element.innerHTML = `<h6>${email["recipients"]}<\h6><h5>${email["subject"]}<\h5><h6>${email["timestamp"]}<\h6><br>`
        document.querySelector('#emails-view').append(element);
        
      });
    });
  }
  else{
    fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
    })
  }
}

function show_email(){
  
}
