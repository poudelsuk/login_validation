import { useState } from "react"




export default function Validation(){
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [errorEmail,setErrorEmail]=useState(false);
    const [errorPassword,setErrorPassword]=useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    const [showPassword,setshowPassword]=useState(false);
    const handleTogglePassword=()=>{
        setshowPassword((prev) => !prev);
    };

    
    const emailregex=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
    const passwordregex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const handleEmail=(e)=>{
        const email=e.target.value;
        setEmail(email);
        setErrorEmail(!email.match(emailregex));
       
};

    const handlePassword=(e)=>{
        const password=e.target.value;
        const passwordValue = e.target.value;
        setPassword(password);
        setErrorPassword(!password.match(passwordregex))
        setPasswordStrength(calculatePasswordStrength(passwordValue));
        

    }
    const calculatePasswordStrength = (password) => {
        let strength = "Weak";
        if (password.length >= 8) {
            let hasUpper = /[A-Z]/.test(password);
            let hasLower = /[a-z]/.test(password);
            let hasNumber = /[0-9]/.test(password);
            let hasSpecial = /[!@#$%^&*]/.test(password);
            
            const criteriaMet = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

            if (criteriaMet === 4) {
                strength = "Strong";
            } else if (criteriaMet === 3) {
                strength = "Medium";
            } else {
                strength = "Weak";
            }
        }
        return strength;
    };
    
   const handleSubmit=(e)=>{
   e.preventDefault(e)
   if (!errorEmail && !errorPassword) {
    alert("Form submitted")
    alert(e.target[0].value+""+e.target[1].value);

   }
   }




    return(

        <div>
            
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                         name="email"
                         value={email} required
                         onChange={handleEmail}
                         
                         />
                         <br/><br/>
                         {errorEmail ?<span style={{color:'red'}}>Its not valid format for email</span>:""}
                </label>
                <br/> <br/>

                <label>
                    Password:
                    <input
                       name="password"
                       type={showPassword ? 'text' : 'password'}
                       value={password} required
                       onChange={handlePassword}
                       />
                     
                       <br/> <br/>
                       {errorPassword ? <span style={{color:'red'}}>Password must fulfill validation criteria</span>:""}
                       
                </label>
                <div>
            <input
           type="checkbox"
           id="showPassword"
           checked={showPassword}
           onChange={handleTogglePassword}
            />
             <label htmlFor="showPassword">Show Password</label>

        </div>
        <div>
                    <strong>Password Strength: </strong>
                    <span style={{
                        color: passwordStrength === "Strong" ? 'green' :
                               passwordStrength === "Medium" ? 'orange' :
                               'red'
                    }}>
                        {passwordStrength}
                    </span>
                </div>
                <br/> <br/>
                <button onSubmit={handleSubmit}>Submit</button>
            </form>

        </div>
    )
};