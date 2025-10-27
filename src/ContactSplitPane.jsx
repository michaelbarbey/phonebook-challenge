import React, { useState, useEffect, useMemo, useRef } from "react";
import "./ContactSplitPane.css";

export default function ContactsSplitPane() {
    const [contacts, setContacts] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [query, setQuery] = useState("");
    const detailRef = useRef(null);

    useEffect(() => {
        fetch("/data/contacts.json")
            .then((response) => response.json())
            .then((data) => {
                setContacts(data);
                if (data.length > 0) {
                    setSelectedId(data[0].id);
                }
            })
            .catch((error) => console.error("Error loading contacts:", error));
    }, []);

    const filtered = useMemo(() => {
        if (!query.trim()) return contacts;
        const q = query.toLowerCase();
        return contacts.filter((c) =>
            [c.firstName, c.lastName, c.email, c.phone].some((field) =>
                String(field || "")
                    .toLowerCase()
                    .includes(q)
            )
        );
    }, [contacts, query]);

    const selected = useMemo(
        () => contacts.find((c) => c.id === selectedId) || null,
        [contacts, selectedId]
    );

    useEffect(() => {
        if (detailRef.current) {
            detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [selectedId]);
    return (
        <div className="contacts-layout">
            {/* Left Contact List Pane */}
            <aside className="list-pane">
                <div className="list-header">
                    <h2 className="list-title">Contacts</h2>
                    <input
                        type="text"
                        placeholder="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                <ul className="list">
                    {filtered.map((contact) => {
                        const isActive = contact.id === selectedId;
                        return (
                            <li key={contact.id} className="list-item">
                                <button
                                    onClick={() => setSelectedId(contact.id)}
                                    className={`row ${isActive ? "row--active" : ""}`}
                                >
                                    <img
                                        src={contact.photo}
                                        alt={`${contact.firstname} ${contact.lastname}`}
                                        className="avatar"
                                    />
                                    <div className="row-text">
                                        <p className="name">
                                            {contact.firstname} {contact.lastname}
                                        </p>
                                        {/*<p className="sub">{contact.email}</p> */}
                                    </div>
                                </button>
                            </li>
                        );
                    })}

                    {filtered.length === 0 && <li className="empty">No results</li>}
                </ul>
            </aside>

            {/* Right Contact Detail Pane */}
            <section ref={detailRef} className="detail-pane">
                {selected ? (
                    <div className="detail-card">
                        <div className="detail-photo-wrap">
                            <img
                                src={selected.photo}
                                alt={`${selected.firstname} ${selected.lastname}`}
                                className="avatar avatar--lg"
                            />
                        </div>

                        <div>
                            <h1 className="detail-title">
                                {selected.firstname} {selected.lastname}
                            </h1>
                            <h3 className="detail-sub">Details</h3>

                            <dl className="fields">
                                <div className="field">
                                    <dt className="field-label">Phone</dt>
                                    <dd className="field-value">
                                        {selected.phone || "-"}
                                    </dd>
                                </div>
                                <div className="field">
                                    <dt className="field-label">Email</dt>
                                    <dd className="field-value">
                                        {selected.email || "-"}
                                    </dd>
                                </div>
                                <div className="field">
                                    <dt className="field-label">Address</dt>
                                    <dd className="field-value">
                                        {selected.address || "-"}
                                    </dd>
                                </div>
                                <div className="field">
                                    <dt className="field-label">Birthday</dt>
                                    <dd className="field-value">
                                        {selected.birthday || "-"}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                ) : (
                    <div className="detail-empty">
                        <p className="detail-empty-title">Select contact</p>
                        <p className="detail-empty-sub">Details...</p>
                    </div>
                )}
            </section>
        </div>
    );
}
