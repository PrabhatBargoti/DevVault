import LegalPageLayout from './LegalPageLayout'

const TermsPage = () => (
  <LegalPageLayout
    title="Terms and Conditions"
    description="Read the terms for using DevVault."
    path="/terms"
  >
    <p>
      These Terms and Conditions describe the rules for using DevVault. By creating an account or using the service,
      you agree to these terms and the Privacy Policy. If you do not agree, do not create an account or use the service.
    </p>

    <section>
      <h2 className="text-xl font-semibold text-[#E7E9EE]">Using DevVault</h2>
      <p className="mt-3">
        You are responsible for activity under your account and for maintaining access to your sign-in method. Use the
        service lawfully, do not interfere with its operation or security, and do not use it to store or distribute
        content that you do not have the right to use. Do not store passwords, API keys, or other secrets in snippets.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#E7E9EE]">Your content</h2>
      <p className="mt-3">
        You retain your rights to content you submit. You give DevVault permission to process that content only as
        needed to provide and maintain the features you use. In the current client, snippets are held in memory for
        the active page session and are discarded when you reload or close the page. Profile settings are stored
        locally in your browser. Snippets are not synchronized with the separate snippet API.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#E7E9EE]">Accounts and third-party services</h2>
      <p className="mt-3">
        Account creation and sign-in are not currently available in the client. The backend uses Supabase to validate
        access tokens for API requests. We may suspend access when reasonably necessary to protect the service, users,
        or its security.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#E7E9EE]">Availability and disclaimers</h2>
      <p className="mt-3">
        DevVault is provided on an “as is” and “as available” basis, without guarantees that it will be uninterrupted,
        error-free, or suitable for a particular purpose. Keep your own backups of important information. To the extent
        permitted by applicable law, DevVault is not responsible for indirect or consequential loss resulting from use
        of the service.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#E7E9EE]">Changes to these terms</h2>
      <p className="mt-3">
        These terms may be updated as DevVault changes. The effective date above identifies the current version.
        Continued use after an update means you accept the updated terms; where required, we will request renewed
        consent before continuing account use.
      </p>
    </section>

    <p className="rounded-xl border border-[#38334A] bg-[#171522] p-4 text-[#D3CFFF]">
      This is an initial product terms document, not legal advice. The project owner should obtain legal review and
      confirm the governing law, contact details, and liability provisions before production launch.
    </p>
  </LegalPageLayout>
)

export default TermsPage
