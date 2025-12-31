const supabaseUrl = 'https://qptemybsoibwzeirgbdx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwdGVteWJzb2lid3plaXJnYmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NTc0MzAsImV4cCI6MjA3ODUzMzQzMH0.O23O3bqCK8l0PpIY_KR9inLY3LVRxDIa3IBf6fq755Q'
const client = supabase.createClient(supabaseUrl , supabaseKey)
console.log(client);

let accountFrom = document.getElementById('account_form')
let loginFrom = document.getElementById('login_form')

if(accountFrom){

accountFrom.addEventListener('submit' , async (e)=>{
e.preventDefault()

    let name = document.getElementById('user_name').value.trim()
    let email = document.getElementById('user_email').value.trim()
    let password = document.getElementById('user_password').value.trim()
    let number = document.getElementById('user_number').value.trim()
    let age = document.getElementById('user_age').value.trim()
    

try{

const { user, error:authError } = await client.auth.signUp({
  email: email,
  password: password,
})
if (authError) {
    throw new Error(authError.message);
    
}
const { data, error:dbError } = await client
  .from('student_form')
  .insert({ Name: name, Email: email , Password: password , Number: number , Age:age})
  .select()

 if(dbError){
  alert(dbError.message)
 } 
 
  alert("User account created ");
  window.location.href = '/login.html'
  
}

catch(error){
alert(error.message)
 }


})
}

// login page

if (loginFrom) {
 
  loginFrom.addEventListener('submit' , async (e)=>{
    e.preventDefault()

    let login_email = document.getElementById('email').value.trim()
    let login_password = document.getElementById('password').value.trim()

const { data, error } = await client.auth.signInWithPassword({
  email: login_email,
  password: login_password,
})

if (error) {
  alert(error.message);
  
}
else{
console.log(data);
alert("user login successfully")
  window.location.href = '/dashboard.html'
}



  })

 
}

let logOutBtn = document.getElementById('logOut')

logOutBtn.addEventListener('click' , async ()=>{

const { data , error } = await client.auth.signOut()

window.location.href = '/index.html'

})

















