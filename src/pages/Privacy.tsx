import { useEffect } from "react";
import "../styles/Terms.css";

const sections = [
  {
    title: "Introduction",
    paragraphs: [
      "This Privacy Policy explains how SWFT handles personal information when you visit our website, use our Discord bots, access our APIs, or use account linking and verification features.",
      "We aim to collect only the information needed to provide, maintain, and protect our services. The information we actually process depends on which SWFT features you use.",
    ],
  },
  {
    title: "Information We May Collect",
    paragraphs: [
      "Depending on your use of SWFT, information we may process includes Discord user IDs, server IDs, usernames, account identifiers from linked platforms, and account verification status.",
      "We may also process information you submit directly, support messages you send us, API request metadata, error reports, and technical logs used to maintain service reliability and security.",
      "We do not need your Discord or Roblox password to verify an account through an authorised OAuth process. Never send passwords or access tokens to us through support messages.",
    ],
  },
  {
    title: "How We Use Your Information",
    paragraphs: [
      "We may use information to operate our website and services, provide Discord bot functionality, link accounts, process verification requests, respond to support enquiries, prevent abuse, troubleshoot errors, and maintain security.",
      "Where applicable, we may also use information to comply with legal obligations, enforce our terms, and protect our services and users.",
    ],
  },
  {
    title: "Discord and Roblox Integrations",
    paragraphs: [
      "If you use Discord integrations, we may process Discord identifiers and the information necessary to provide the requested features.",
      "If you use Roblox account verification, we may receive account information that you authorise Roblox to share, such as your Roblox user ID and username, depending on the permissions requested and the verification method implemented.",
      "Third-party authentication is governed by the relevant platform's own privacy policies and terms. You can review and manage connected application permissions through the relevant platform where those controls are available.",
    ],
  },
  {
    title: "Legal Basis for Processing",
    paragraphs: [
      "Where UK GDPR or similar data protection laws apply, we process personal information only where an appropriate legal basis exists.",
      "Depending on the circumstances, this may include performing a service you request, pursuing legitimate interests such as service security and fraud prevention, complying with legal obligations, or obtaining your consent where required.",
    ],
  },
  {
    title: "Sharing Information",
    paragraphs: [
      "We do not make personal information publicly available except where a feature is specifically designed to display information or you choose to share it.",
      "Information may be processed by service providers that help us host the website, operate databases, monitor errors, or deliver integrations. We may also disclose information where required by law or reasonably necessary to protect rights and security.",
      "We do not sell personal information as part of our stated service practices. Confirm this statement against your actual operations before publishing.",
    ],
  },
  {
    title: "Cookies and Technical Data",
    paragraphs: [
      "Our website and service providers may use cookies, local storage, or similar technologies where needed for functionality, security, preferences, or analytics.",
      "The technologies actually used depend on your website configuration. Where consent is legally required for non-essential cookies or similar technologies, the appropriate consent process should be provided.",
    ],
  },
  {
    title: "Data Retention and Security",
    paragraphs: [
      "We retain personal information only for as long as reasonably necessary for the purposes described in this policy, including service delivery, security, dispute resolution, and legal compliance.",
      "Retention periods may vary by information type and feature. We apply appropriate technical and organisational safeguards designed to protect information from unauthorised access, loss, misuse, or disclosure.",
      "No method of storage or transmission is completely secure, and absolute security cannot be guaranteed.",
    ],
  },
  {
    title: "International Transfers",
    paragraphs: [
      "Our hosting providers or other service providers may process information in countries outside the United Kingdom. Where data protection law requires safeguards for international transfers, appropriate safeguards should be implemented.",
    ],
  },
  {
    title: "Your Privacy Rights",
    paragraphs: [
      "Depending on your location and the applicable law, you may have rights to request access to your personal information, correct inaccurate information, request deletion, restrict or object to certain processing, or receive a portable copy of information.",
      "Where processing relies on consent, you may be able to withdraw that consent. You may also have the right to complain to the Information Commissioner's Office (ICO) in the United Kingdom.",
      "To make a privacy request, contact us using the contact method provided on our website. We may need to verify your identity before responding.",
    ],
  },
  {
    title: "Children's Privacy",
    paragraphs: [
      "Our services are not intended to override the minimum age requirements or other eligibility rules imposed by applicable law or third-party platforms.",
      "If you believe personal information has been provided to us inappropriately, please contact us so we can assess the situation and take appropriate action.",
    ],
  },
  {
    title: "Third-Party Websites",
    paragraphs: [
      "Our website may link to Discord, Roblox, or other external websites. We do not control their privacy practices, and their own policies apply when you use their services.",
    ],
  },
  {
    title: "Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy as our services, data practices, or legal obligations change. The updated version will be published on this page with a revised effective date where appropriate.",
    ],
  },
  {
    title: "Contact and Complaints",
    paragraphs: [
      "For questions about this Privacy Policy or to make a privacy request, contact us through the official SWFT website at swft-bot.xyz.",
      "If you are in the United Kingdom and believe your personal information has been handled unlawfully, you may also contact the Information Commissioner's Office at ico.org.uk.",
    ],
  },
];

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy | SWFT";

    let description = document.querySelector(
      'meta[name="description"]'
    );

    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }

    description.setAttribute(
      "content",
      "Learn how SWFT handles personal information across its website, Discord bots, APIs, and account verification services."
    );

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute(
      "href",
      "https://swft-bot.xyz/privacy"
    );
  }, []);

  return (
    <main className="terms-page">
      <div className="terms-container">
        <header className="terms-header">
          <a href="/" className="terms-brand">
            <span className="terms-brand-icon">S</span>
            SWFT
          </a>

          <p className="terms-eyebrow">LEGAL &amp; POLICIES</p>

          <h1>
            Privacy Policy<span>.</span>
          </h1>

          <p className="terms-intro">
            How SWFT collects, uses, stores, and protects information
            when you use our website, Discord bots, APIs, and integrations.
          </p>

          <p className="terms-date">
            Effective date: 14 October 2026
          </p>
        </header>

        <div className="terms-layout">
          <aside className="terms-sidebar">
            <p className="terms-sidebar-heading">ON THIS PAGE</p>

            <nav>
              {sections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#privacy-${index + 1}`}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="terms-content">
            <div className="terms-notice">
              <h2>Your privacy matters</h2>
              <p>
                This policy describes our intended approach to privacy.
                The final published version must accurately reflect the
                information SWFT actually collects and how it is used.
              </p>
            </div>

            {sections.map((section, index) => (
              <section
                key={section.title}
                id={`privacy-${index + 1}`}
                className="terms-section"
              >
                <h2>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>

                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}

            <footer className="terms-footer">
              <a href="/">Home</a>
              <a href="/terms">Terms of Service</a>
              <a href="/support">Support</a>
              <a href="https://swft-bot.xyz">Website</a>

              <p>
                © {new Date().getFullYear()} SWFT. All rights reserved.
              </p>
            </footer>
          </article>
        </div>
      </div>
    </main>
  );
}