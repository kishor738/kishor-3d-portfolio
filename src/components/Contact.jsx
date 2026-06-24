import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const recipientEmail = 'kishorrathod6203@gmail.com'

const contactItems = [
  {
    label: 'Email',
    value: recipientEmail,
    href: `mailto:${recipientEmail}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Hyderabad, Telangana, India',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+91 6268036569',
    href: 'tel:+916268036569',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/kishor738' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kishor-rathod-1b4a34221/' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/kishorrathod6203/' },
]

function Contact() {
  const submitFrameLoaded = useRef(false)
  const submittingRef = useRef(false)
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [fileName, setFileName] = useState('No file chosen')

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
    setFileName('No file chosen')
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    if (submitStatus !== 'idle') setSubmitStatus('idle')
  }

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name)
    } else {
      setFileName('No file chosen')
    }
  }

  const handleSubmit = () => {
    submittingRef.current = true
    setSubmitStatus('sending')
  }

  const handleSubmitFrameLoad = () => {
    if (!submitFrameLoaded.current) {
      submitFrameLoaded.current = true
      return
    }

    if (!submittingRef.current) return

    submittingRef.current = false
    setSubmitStatus('success')
    resetForm()

    window.setTimeout(() => {
      setSubmitStatus('idle')
    }, 3500)
  }

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-[1240px] overflow-hidden px-[18px] py-16 sm:py-20 sm:px-6"
    >
      <div className="grid grid-cols-1 items-stretch gap-6 md:gap-8 lg:grid-cols-[1.1fr_1.5fr_0.9fr]">
        <motion.div
          className="pro-panel-glass flex flex-col justify-between p-6 sm:p-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#4361EE]/[0.22] bg-white/[0.04] px-3 py-1.5 backdrop-blur-[16px]">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
              <span className="text-[0.72rem] font-bold uppercase tracking-[1.5px] text-[#e2e8f0]">
                Available for freelance opportunities
              </span>
            </div>
            <p className="mb-8 text-[0.95rem] leading-[1.6] text-white/80">
              Share your idea, tech, or project requirement. I will help turn it into a clean,
              responsive, production-ready user experience.
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-5">
            {contactItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3.5 rounded-xl border border-white/[0.04] bg-white/[0.015] p-3 transition-all duration-300 hover:border-[#4361EE]/20 hover:bg-white/[0.035]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#4361EE]/[0.14] bg-[#4361EE]/[0.08] text-[#4361EE]">
                  {item.icon}
                </div>
                <div className="min-w-0 text-left">
                  <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[#8892A4]">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      className="block truncate text-[0.9rem] font-semibold text-white/85 transition-colors duration-300 hover:text-white"
                      href={item.href}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="block truncate text-[0.9rem] font-semibold text-white/85">
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3.5 rounded-xl border border-white/[0.04] bg-white/[0.015] p-3 transition-all duration-300 hover:border-[#4361EE]/20 hover:bg-white/[0.035]">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#4361EE]/[0.14] bg-[#4361EE]/[0.08] text-[#4361EE]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <div className="min-w-0 text-left">
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[#8892A4]">
                  Connect
                </span>
                <div className="mt-0.5 flex items-center gap-1.5">
                  {socialLinks.map((link, index) => (
                    <span className="inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-white/80" key={link.label}>
                      <a
                        className="transition-colors duration-300 hover:text-[#38BDF8]"
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label}
                      </a>
                      {index < socialLinks.length - 1 && (
                        <span className="text-white/20">•</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          className="pro-panel-glass flex flex-col gap-4 p-6 sm:p-8"
          action={`https://formsubmit.co/${recipientEmail}`}
          method="POST"
          encType="multipart/form-data"
          target="contact-submit-frame"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_subject"
            value={formData.subject ? `Portfolio inquiry: ${formData.subject}` : 'Portfolio inquiry'}
          />
          <input type="hidden" name="_replyto" value={formData.email} />
          <input type="hidden" name="_template" value="table" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-[0.9rem] font-medium text-white/80">
              Name
              <input
                className="rounded-xl border border-[#4361EE]/18 bg-white/[0.02] px-3.5 py-2.5 font-sans text-[0.92rem] text-white transition-all duration-300 focus:outline-none focus:bg-[#4361EE]/8 focus:border-[#4361EE]/40 focus:ring-2 focus:ring-[#4361EE]/15"
                name="name"
                type="text"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-[0.9rem] font-medium text-white/80">
              Email
              <input
                className="rounded-xl border border-[#4361EE]/18 bg-white/[0.02] px-3.5 py-2.5 font-sans text-[0.92rem] text-white transition-all duration-300 focus:outline-none focus:bg-[#4361EE]/8 focus:border-[#4361EE]/40 focus:ring-2 focus:ring-[#4361EE]/15"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-[0.9rem] font-medium text-white/80">
            Subject
            <input
              className="rounded-xl border border-[#4361EE]/18 bg-white/[0.02] px-3.5 py-2.5 font-sans text-[0.92rem] text-white transition-all duration-300 focus:outline-none focus:bg-[#4361EE]/8 focus:border-[#4361EE]/40 focus:ring-2 focus:ring-[#4361EE]/15"
              name="subject"
              type="text"
              placeholder="What this is about"
              required
              value={formData.subject}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-[0.9rem] font-medium text-white/80">
            Message
            <textarea
              className="min-h-[96px] resize-y rounded-xl border border-[#4361EE]/18 bg-white/[0.02] px-3.5 py-2.5 font-sans text-[0.92rem] text-white transition-all duration-300 focus:outline-none focus:bg-[#4361EE]/8 focus:border-[#4361EE]/40 focus:ring-2 focus:ring-[#4361EE]/15"
              name="message"
              placeholder="Tell me what you want to build..."
              required
              value={formData.message}
              onChange={handleChange}
            />
          </label>

          <div className="flex flex-col gap-2 border-t border-white/[0.04] pt-4">
            <span className="text-[0.88rem] font-medium text-white/80">
              Attach your resume (PDF, DOC, DOCX)
            </span>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                id="resume-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="resume-upload"
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.8rem] font-bold text-white/70 transition-all hover:border-white/20 hover:bg-white/[0.06] sm:w-auto"
              >
                Choose File
              </label>
              <span className="max-w-full truncate text-[0.78rem] text-white/50 sm:max-w-[200px]">{fileName}</span>
            </div>
          </div>

          <motion.button
            className="mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#4361EE] px-6 py-3 font-bold text-white shadow-[0_4px_16px_rgba(67,97,238,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3451D1] hover:shadow-[0_8px_24px_rgba(67,97,238,0.38)] disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            disabled={submitStatus === 'sending'}
          >
            <span>
              {submitStatus === 'sending'
                ? 'Sending...'
                : submitStatus === 'success'
                  ? 'Message Sent'
                  : 'Send Message'}
            </span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </motion.button>

          <div className="min-h-[1.25rem] text-[0.82rem]">
            {submitStatus === 'sending' && (
              <p className="m-0 text-white/55">Sending your message without leaving the page...</p>
            )}
            {submitStatus === 'success' && (
              <p className="m-0 text-[#34d399]">Your message has been sent successfully.</p>
            )}
          </div>
        </motion.form>

        <motion.div
          className="relative hidden min-h-[300px] items-center justify-center lg:flex"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative flex h-64 w-64 items-center justify-center">
            <div className="absolute inset-0 animate-[rotCW_25s_linear_infinite] rounded-full border border-[#4361EE]/10 shadow-[0_0_50px_rgba(67,97,238,0.15)]" />
            <div className="absolute inset-[30px] animate-[rotCCW_18s_linear_infinite] rounded-full border border-[#38BDF8]/20 shadow-[0_0_40px_rgba(56,189,248,0.1)]" />
            <div className="absolute inset-[60px] animate-[rotCW_12s_linear_infinite] rounded-full border border-dashed border-[#6366F1]/30" />
            <div className="absolute inset-[90px] animate-pulse rounded-full bg-gradient-to-br from-[#38BDF8] to-[#6366F1] shadow-[0_0_40px_rgba(56,189,248,0.6)]" />
          </div>
        </motion.div>
      </div>

      <iframe
        name="contact-submit-frame"
        title="Contact form submission"
        className="hidden"
        onLoad={handleSubmitFrameLoad}
      />
    </section>
  )
}

export default Contact
