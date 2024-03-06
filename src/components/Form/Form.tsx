import React, { useState } from 'react'
import FormData from '../../types/FormData'
import "./Form.css";
const Form = () => {
    const [data, setData] = useState<FormData>({
        name: "",
        surname: "",
        email: "",
        birthday: new Date(),
        role: "JD",
        hasAgreed: false
    })

    const emailRegExp = /^[A-Za-z0-9][A-Za-z0-9._-]*@[a-z]+.[a-z]{2,3}$/;
    const nameRegExp = /[\d\[\]*+§#°@\-ç_.:,;^?|!£%&/()=\\$]/;
    const currentYear = new Date().getFullYear();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type, value } = event.target;
        const { checked } = event.target as HTMLInputElement;
        if (type === "date") {
            if (/^\d{4}-\d{2}-\d{2}$/.test(value))
                setData((data) => ({ ...data, [name]: new Date(value) }));
        } else setData((data) => ({ ...data, [name]: type === 'checkbox' ? checked : value }));
    }

    const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.classList.contains("invalid")) {
            event.target.classList.remove("invalid");
        }
        const errorElement = (document.querySelector(".error." + event.target.name)) as HTMLElement;
        if (errorElement) errorElement.style.display = "none";
    }

    const handleBlur = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        const errorElement = (document.querySelector(".error." + name)) as HTMLElement;
        console.log(value);
        //RegExp checks if valid name or surname
        if (((name === "name" || name === "surname") && nameRegExp.test(value)) ||
            //RegExp checks if valid email
            (name === "email" && !emailRegExp.test(value)) ||
            (name === "birthday" && (+value.slice(-4) <= 1900 || +value.slice(-4) >= currentYear) && value !== "")) {
            errorElement.style.display = "block";
        }
    }

    return (
        <form name="form" className='input-form d-flex flex-column w-25' onSubmit={(event: React.FormEvent) => {event.preventDefault(); console.log(data)}}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                value={data.name}
                onFocus={(event) => handleFocus(event)}
                onChange={(event) => handleChange(event)}
                onBlur={(event) => handleBlur(event)} />
            <p className="error name">Invalid name. Please re-enter your name.</p>

            <label htmlFor="surname">Surname</label>
            <input
                type="text"
                name="surname"
                value={data.surname}
                onFocus={(event) => handleFocus(event)}
                onChange={(event) => handleChange(event)}
                onBlur={(event) => handleBlur(event)} />
            <p className="error surname">Invalid surname. Please re-enter your surname.</p>

            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                value={data.email}
                onFocus={(event) => handleFocus(event)}
                onChange={(event) => handleChange(event)}
                onBlur={(event) => handleBlur(event)} />
            <p className="error email">Invalid e-mail. Please check for any missing or extra characters.</p>

            <label htmlFor="birthday">Birthday</label>
            <input
                type="date"
                name="birthday"
                maxLength={10}
                value={data.birthday.toString().length !== 11 ? data.birthday.toISOString().substring(0, 10) : data.birthday.toISOString().slice(0, 10)}
                onFocus={(event) => handleFocus(event)}
                onChange={(event) => handleChange(event)}
                onBlur={(event) => handleBlur(event)} />
            <p className="error birthday">Very funny. Re-insert your ACTUAL birthday, will you?</p>

            <label htmlFor="role">Role</label>
            <select name="role" value={data.role} onChange={(event) => handleChange(event)}
                onBlur={(event) => handleBlur(event)}>
                <option disabled>Select an Option</option>
                <option value="JD">JD</option>
                <option value="SD">SD</option>
                <option value="Director">Director</option>
            </select>

            <div className='authorise-consent-container'>
                <input
                    type="checkbox"
                    name="hasAgreed"
                    checked={data.hasAgreed}
                    onFocus={(event) => handleFocus(event)}
                    onChange={(event) => handleChange(event)}
                    onBlur={(event) => handleBlur(event)} />
                <label htmlFor="hasAgreed">I agree with the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a></label>
            </div>
            <div className='mt-3'>
                <button type='submit' className='btn btn-secondary'>Submit</button>
            </div>
        </form>
    )
}

export default Form
