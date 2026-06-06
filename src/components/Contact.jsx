import { useState } from "react";
import { motion } from "framer-motion";

const contactItems = [
  {
    label: "Email",
    value: "kishorrathod6203@gmail.com",
    href: "mailto:kishorrathod6203@gmail.com",
  },
  { label: "Location", value: "Hyderabad, Telangana, India" },
  { label: "Phone", value: "+91 6268036569", href: "tel:+916268036569" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/kishor738" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kishor-rathod-1b4a34221/",
  },
  { label: "LeetCode", href: "https://leetcode.com/u/kishorrathod6203/" },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault()

  //   const mailSubject = encodeURIComponent(formData.subject || `Portfolio inquiry from ${formData.name || 'a visitor'}`)
  //   const mailBody = encodeURIComponent(
  //     `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
  //   )

  //   window.location.href = `mailto:kishorrathod6203@gmail.com?subject=${mailSubject}&body=${mailBody}`
  // }
  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}
Email: ${formData.email}

${formData.message}`,
    );

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=kishorrathod6203@gmail.com&su=${subject}&body=${body}`,
      "_blank",
    );

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      className="contact-section section pro-contact-section"
    >
      <div className="section-heading pro-section-heading">
        <p>Get in Touch</p>
        <h2>Let's connect and build something great.</h2>
      </div>

      <div className="contact-grid pro-contact-grid">
        <motion.div
          className="contact-panel glass-panel pro-contact-panel"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="contact-availability">
            Available for frontend opportunities
          </span>
          <p>
            Share your idea, role, or project requirement. I will help turn it
            into a clean, responsive, production-ready user experience.
          </p>

          <div className="contact-info">
            {contactItems.map((item) => (
              <div className="contact-item" key={item.label}>
                <strong>{item.label}</strong>
                {item.href ? (
                  <a href={item.href}>{item.value}</a>
                ) : (
                  <span>{item.value}</span>
                )}
              </div>
            ))}
            <div className="contact-item">
              <strong>Connect</strong>
              <div className="contact-links">
                {socialLinks.map((link, index) => (
                  <span className="contact-link-wrap" key={link.label}>
                    <motion.a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ y: -2 }}
                    >
                      {link.label}
                    </motion.a>
                    {index < socialLinks.length - 1 && (
                      <span className="contact-separator">/</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          className="contact-form glass-panel pro-contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <label>
            Name
            <input
              name="name"
              type="text"
              placeholder="Your full name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Subject
            <input
              name="subject"
              type="text"
              placeholder="Project, role, or collaboration"
              required
              value={formData.subject}
              onChange={handleChange}
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              placeholder="Tell me what you want to build..."
              value={formData.message}
              onChange={handleChange}
            />
          </label>
          <motion.button
            className="btn"
            type="submit"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;
