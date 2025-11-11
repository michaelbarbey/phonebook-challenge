import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LS_KEY = "contacts";

export default function AddContact() {
    const navigate = useNavigate(); // navigates to different routes in the app
    const formRef = useRef(null);

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        address: "",
        birthday: "",
        // photo: "" not sure how to implement this just yet
    });

    const [errors, setErrors] = useState({});

    // handle change of the contact
    function updateContact(element) {
        const { name, value } = element.target;
        setForm((f) => ({ ...f, [name]: value }));

        // error validation
        if (errors[name]) {
            setErrors((errs) => ({ ...errs, [name]: undefined }));
        }
    }

    function inputValidation(values) {
        const errs = {};
        if (!values.firstname?.trim()) errs.firstname = "Please enter a first name.";
        else if (values.firstname.trim().length < 2)
            errs.firstname = "First name must contain more than two characters.";

        if (!values.lastname?.trim()) errs.lastname = "Please enter a last name.";
        else if (values.lastname.trim().length < 2)
            errs.lastname = "Last name must contain more than two characters.";

        if (
            values.phone &&
            !/^\+?\d?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(values.phone)
        ) {
            errs.phone = "Please enter a valid phone number.";
        }

        if (values.email && !/@/.test(values.email)) {
            errs.email = "Please enter a valid email address.";
        }
        return errs;
    }

    function submitContact(element) {
        element.preventDefault();

        const evaluate = inputValidation(form);
        if (Object.keys(evaluate).length > 0) {
            setErrors(evaluate);

            const first = Object.keys(evaluate)[0];
            const elementEvaluate = document.getElementById(first);
            if (elementEvaluate) elementEvaluate.focus();
            return;
        }

        const id = ""; // generate new ids for contants using map or loop
        const addContact = { id, ...form };

        const existing = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
        const updated = [addContact, ...existing];
        localStorage.setItem(LS_KEY, JSON.stringify(updated));

        navigate("/"); // list page
    }

    return (
        <main>
            <div style={{ padding: "2rem" }}>
                <Link to="/" className="btn">
                    Back
                </Link>
            </div>

            <section
                className="page add-contact-page"
                style={{ maxWidth: 720, margin: "0 auto" }}
            >
                <div className="form-image-split">
                    <section className="contact-form">
                        <header className="page__header">
                            <h1 className="page__title">New Contact</h1>
                        </header>

                        <form
                            ref={formRef}
                            className="form__body"
                            onSubmit={submitContact}
                            noValidate
                            style={{ display: "grid", gap: 10, marginTop: 2 }}
                        >
                            <ul className="form-list">
                                <li className={errors.firstname ? "error" : ""}>
                                    <label htmlFor="firstname">First Name </label>
                                    <input
                                        id="firstname"
                                        name="firstname"
                                        placeholder="John"
                                        value={form.firstname}
                                        onChange={updateContact}
                                        required
                                        minLength={2}
                                        aria-invalid={!!errors.firstname}
                                        aria-describedby={
                                            errors.firstname
                                                ? "err-firsname"
                                                : undefined
                                        }
                                    />
                                    {errors.firstname && (
                                        <small id="err-firsname" className="error-text">
                                            {errors.firstname}
                                        </small>
                                    )}
                                </li>
                                <li className="field">
                                    <label htmlFor="lastname">Last Name </label>
                                    <input
                                        id="lastname"
                                        name="lastname"
                                        placeholder="Appleseed"
                                        value={form.lastname}
                                        onChange={updateContact}
                                        required
                                    />
                                </li>
                                <li className="field">
                                    <label htmlFor="phone">Phone Number </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        placeholder="(123) 456-7890"
                                        value={form.phone}
                                        onChange={updateContact}
                                        required
                                    />
                                </li>
                                <li className="field">
                                    <label htmlFor="email">Email </label>
                                    <input
                                        id="email"
                                        name="email"
                                        placeholder="johnappleseed@email.com"
                                        value={form.email}
                                        onChange={updateContact}
                                        required
                                    />
                                </li>
                                <li className="field">
                                    <label htmlFor="address">Address </label>
                                    <input
                                        id="address"
                                        name="address"
                                        placeholder="123 Sesame Street"
                                        value={form.address}
                                        onChange={updateContact}
                                        required
                                    />
                                </li>
                                <li className="field">
                                    <label htmlFor="birthday">Birthday </label>
                                    <input
                                        id="birthday"
                                        name="birthday"
                                        placeholder="09-16-2001"
                                        value={form.birthday}
                                        onChange={updateContact}
                                        required
                                    />
                                </li>
                            </ul>
                            <img></img>
                        </form>
                    </section>

                    <aside className="image-section">
                        <img
                            src="/src/assets/images/contact-default.png"
                            alt="stock image"
                            className="form-side-image"
                        />
                    </aside>
                </div>
            </section>
            <div className="form-button" style={{ marginTop: 0 }}>
                <button className="btn btn--primary" onClick={submitContact}>
                    Save
                </button>
            </div>
        </main>
    );
}
