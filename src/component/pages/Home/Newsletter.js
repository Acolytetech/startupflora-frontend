import React, { useState } from "react";
import style from "./Newsletter.module.css";
 
function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
 
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!isValidEmail(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }
 
    setLoading(true);
    setStatus("");
 
    try {
      const response = await fetch(
        "https://h83n4udb.api.sanity.io/v2022-03-07/data/mutate/production",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer skuICFx8eaCgBPMx9PmD4VQsMPBvZ2k5sCtXoQDnDBQRagTaPXI25iKVNcxICiEquktfwABEWnFTBX8MwhPQlZLuj0kqxW0bUalheZn9Vnn2B8YvRWjwwKldkrZUrIfNw48JmxCfcBUkCCNMVJOVHudqdN8Jqeoi2LivHKfxT5tIxBiaaa9V`,
          },
          body: JSON.stringify({
            mutations: [
              {
                create: {
                  _type: "newsletter",
                  email: email,
                  subscribedAt: new Date().toISOString(),
                },
              },
            ],
          }),
        }
      );
 
      const result = await response.json();
 
      if (response.ok) {
        setStatus("Thank you for subscribing!");
        setEmail("");
      } else {
        console.error("Error response:", result);
        setStatus("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Failed to save subscription:", error);
      setStatus("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className={style.newsletterContainer}>
      <h2 className={style.heading}>
        Subscribe to our newsletter to get updates from StartupFlora.
      </h2>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="you@example.com"
          className={style.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className={style.button} disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {status && <p className={style.status}>{status}</p>}
    </div>
  );
}
 
export default Newsletter;