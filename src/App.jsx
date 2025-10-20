import { useEffect, useMemo, useState } from "react";
import "./App.css";

const FALLBACK_CONTACTS = [
    {
        id: 1,
        name: "Ada Lovelace",
        phone: "(555) 010-0101",
        email: "ada@example.com",
    },
    {
        id: 2,
        name: "Alan Turing",
        phone: "(555) 010-0102",
        email: "alan@example.com",
    },
    {
        id: 3,
        name: "Grace Hopper",
        phone: "(555) 010-0103",
        email: "grace@example.com",
    },
];

const App = () => {
    const [contacts, setContacts] = useState(FALLBACK_CONTACTS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("data/contacts.json")
            .then((response) => response.json())
            .then((data) => setContacts(data))
            .catch((error) => console.error("Error loading contacts:", error));
    }, []);

    const [query, setQuery] = useState("");

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        birthday: "",
        photo: "",
    });
    function handleSubmit(e) {
        e.preventDefault();
        // Add contact submission logic here
    }

    return (
        <main className="page" data-testid="page-root">
            <header className="page__header">
                <h1 className="page__title">Contacts</h1>

                <section className="search" aria-labelledby="search-heading">
                    <div className="search__controls">
                        <input
                            id="search-input"
                            type="search"
                            placeholder="Search by name or phone"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            data-testid="search-input"
                        />
                    </div>

                    <p className="search__results" data-testid="results-count">
                        Showing {contacts.length}{" "}
                        {contacts.length === 1 ? "result" : "results"}
                        {loading ? " (loading...)" : ""}
                        {error ? ` (error: ${error})` : ""}
                    </p>
                </section>
            </header>

            {/* Recent Contacts -- To develop */}
            <section className="contacts" aria-labelledby="contacts-heading">
                <h2 id="contacts-heading">Recent</h2>
            </section>

            <div>
                <h2>My Contacts</h2>
                {contacts.map((contact) => (
                    <li key={contact.id} className="contacts">
                        <div className="contact-card">
                            <img
                                className="contact-photo"
                                src={contact.photo}
                                alt={`${contact.name}`}
                                width="100"
                            />
                            <div>
                                <h3 className="contact-card__name">{contact.name}</h3>
                                <p className="contact-card__phone">{contact.phone}</p>
                                <p className="contact-card__email">{contact.email}</p>
                                <p className="contact-card__address">
                                    {contact.address}
                                </p>
                                <p className="contact-card__birthday">
                                    {contact.birthday}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </div>

            <section className="form" aria-labelledby="form-heading">
                <h2 id="form-heading">Add a Contact</h2>
                <form className="form__body" onSubmit={handleSubmit} noValidate>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            minLength={2}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            inputMode="tel"
                            placeholder="(555) 555-5555"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="form__actions">
                        <button className="btn" type="submit" data-testid="btn-add">
                            Add Contact
                        </button>
                    </div>
                </form>
            </section>

            <footer className="page__footer">
                <small>
                    Starter provided. Complete tasks per README and make this page
                    shine.
                </small>
            </footer>
        </main>
    );
};

export default App;
