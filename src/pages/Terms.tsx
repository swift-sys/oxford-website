import { useEffect } from "react";
import "../styles/Terms.css";

const sections = [
  {
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using SWFT, including our website, Discord bots, APIs, integrations, and related services, you agree to these Terms of Service. If you do not agree, you must stop using our services.",
      "You must also comply with applicable laws, Discord's Terms of Service, and Discord's Community Guidelines.",
    ],
  },
  {
    title: "Our Services",
    paragraphs: [
      "SWFT provides digital services that may include Discord bot functionality, server management tools, APIs, account verification, integrations, and community management features.",
      "We may modify, suspend, or discontinue features when reasonably necessary.",
    ],
  },
  {
    title: "Accounts and Eligibility",
    paragraphs: [
      "You are responsible for providing accurate information, protecting your account credentials, and ensuring that your use of SWFT complies with applicable laws and platform rules.",
      "You must not impersonate another person or access accounts without authorisation.",
    ],
  },
  {
    title: "Acceptable Use",
    paragraphs: [
      "You must not use SWFT to break applicable laws, harass or defraud others, exploit vulnerabilities, gain unauthorised access, disrupt our services, circumvent API rate limits, abuse verification systems, distribute malware or spam, or violate another person's rights.",
    ],
  },
  {
    title: "Third-Party Services",
    paragraphs: [
      "SWFT may integrate with Discord, Roblox, hosting providers, databases, and other third-party services. Your use of those services is also governed by their respective terms and policies.",
      "SWFT is an independent service and is not affiliated with or endorsed by Discord or Roblox unless expressly stated.",
      "Third-party outages or API changes may affect the availability of our features.",
    ],
  },
  {
    title: "Verification and Account Linking",
    paragraphs: [
      "You may only link accounts that you own or are authorised to use. Authentication must take place through the relevant platform's authorised process.",
      "You must not share passwords or authentication tokens with unauthorised parties. Verification may be affected by technical limitations or third-party outages.",
    ],
  },
  {
    title: "APIs and Security",
    paragraphs: [
      "API access may be subject to authentication, usage limits, rate limits, and additional conditions. You must keep API keys and credentials secure.",
      "We may restrict or revoke access in response to abuse, excessive usage, or security risks.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "Unless otherwise stated, SWFT's original branding, website design, code, and materials are owned by or licensed to SWFT.",
      "You may not reproduce or redistribute protected materials without permission, except where permitted by law or an applicable licence.",
    ],
  },
  {
    title: "Privacy and Data",
    paragraphs: [
      "Our handling of personal information is explained in our Privacy Policy.",
      "Depending on the features you use, we may process account identifiers, verification status, and technical logs to operate and secure our services.",
    ],
  },
  {
    title: "Availability and Liability",
    paragraphs: [
      "SWFT is provided on an as-available basis. We do not guarantee uninterrupted or error-free operation.",
      "To the extent permitted by applicable law, SWFT will not be liable for indirect or consequential losses. Nothing in these terms excludes liability or consumer rights that cannot legally be excluded.",
    ],
  },
  {
    title: "Suspension and Termination",
    paragraphs: [
      "We may suspend or terminate access where reasonably necessary, including for violations of these terms, security threats, abuse, or legal requirements.",
      "You may stop using SWFT at any time.",
    ],
  },
  {
    title: "Changes to These Terms",
    paragraphs: [
      "We may update these terms from time to time. Changes will be published on this page, with the effective date updated accordingly. Where required by law, we will provide notice of material changes.",
    ],
  },
  {
    title: "Governing Law and Contact",
    paragraphs: [
      "These terms are subject to the laws applicable to the operator of SWFT, without overriding mandatory consumer protections that apply to you.",
      "For questions about these terms, please contact us through our official website.",
    ],
  },
];

export default function Terms() {
  useEffect(() => {
    document.title = "Terms of Service | SWFT";

    const description = document.querySelector(
      'meta[name="description"]'
    );

    if (description) {
      description.setAttribute(
        "content",
        "Read the Terms of Service for SWFT bots, APIs, integrations, and related services."
      );
    }
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
            Terms of Service<span>.</span>
          </h1>

          <p className="terms-intro">
            The rules and conditions governing your use of SWFT, our Discord
            bots, APIs, integrations, and related services.
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
                  href={`#terms-${index + 1}`}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="terms-content">
            <div className="terms-notice">
              <h2>Please read carefully</h2>
              <p>
                By using SWFT, you agree to the terms below, subject to any
                rights you have under applicable law.
              </p>
            </div>

            {sections.map((section, index) => (
              <section
                key={section.title}
                id={`terms-${index + 1}`}
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

                {section.title === "Privacy and Data" && (
                  <p>
                    Read our{" "}
                    <a href="/privacy">Privacy Policy</a> for more
                    information about how your information is handled.
                  </p>
                )}

                {section.title === "Governing Law and Contact" && (
                  <p>
                    Visit{" "}
                    <a href="https://swft-bot.xyz">
                      swft-bot.xyz
                    </a>{" "}
                    to find our official contact options.
                  </p>
                )}
              </section>
            ))}

            <footer className="terms-footer">
              <a href="/">Home</a>
              <a href="/privacy">Privacy Policy</a>
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