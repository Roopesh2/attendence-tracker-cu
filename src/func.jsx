function submit(email, enterPassword, confirmPassword,signup) {
    if (signup){
        if (enterPassword !== confirmPassword) {
            alert('Passwords do not match!');
        }
        else {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        }

    }
    else{
        if (localStorage.getItem('email')==email &&localStorage.getItem('password')==password){
            alert("WELCOME BACK!!!")
        }
    }
  } 