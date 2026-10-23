import LegalPageLayout from './LegalPageLayout'

const PrivacyPolicyPage = () => (
  <LegalPageLayout
    title="Privacy Policy"
    description="Learn what information DevVault stores and how it is used."
    path="/privacy-policy"
  >
    <p>
      This policy describes how DevVault handles information when you use the website. The current client stores
      snippets and profile settings in your browser. If account authentication is configured, Supabase Auth processes
      sign-up, login, OAuth, and password-reset requests. The client is not currently connected to the separate
      snippet API, so browser-stored snippets are not synchronized to that API.
    </p>

    <section>
      <h2 className="text-xl font-semibold text-[#E7E9EE]">Information you provide</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li>Snippets you enter are held in application memory for the active page session and are cleared when you reload or close the page. Profile details are stored in browser local storage.</li>
        <li>For email registration, Supabase Auth receives your email, password credential, and the name you provide. DevVault does not receive or store your plaintext password.</li>
        <li>If you choose Google or GitHub sign-in, the selected provider and Supabase process the account information needed to authenticate you.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#E7E9EE]">How information is used</h2>
      <p className="mt-3">
        Information is used to provide the features you request, maintain your session-only snippets and profile, authenticate
        accounts, and support account recovery. The client does not include an analytics package in its current
        implementation.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#E7E9EE]">Storage and service providers</h2>
      <p className="mt-3">
        Snippets are held in memory only while the page is open and can be removed using the clear-session-vault
        control. Profile data remains in browser local storage until you remove it or clear browser data.
        Authentication data is processed by
        Supabase and, when selected, Google or GitHub. Those providers handle information under their own policies.
        DevVault does not control their services or retention practices.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#E7E9EE]">Your choices and data safety</h2>
      <p className="mt-3">
        You can clear session snippets through the app and remove profile data through your browser settings. Profile
        local storage is not encrypted by DevVault and is not appropriate for passwords, access tokens, or other
        secrets. Do not save sensitive information in snippets. Account deletion and a self-service export of
        authentication data are not currently provided in the client.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#E7E9EE]">Children, changes, and questions</h2>
      <p className="mt-3">
        DevVault is a general developer tool and is not designed to collect information from children. This policy may
        be updated as the product changes; the effective date above will be revised when it does. For privacy questions
        or requests, contact the maintainers through the DevVault GitHub repository.
      </p>
    </section>

    <p className="rounded-xl border border-[#38334A] bg-[#171522] p-4 text-[#D3CFFF]">
      This is an initial product policy, not legal advice. The project owner should review it for the applicable
      jurisdictions, hosting configuration, and actual data-retention practices before production launch.
    </p>
  </LegalPageLayout>
)

export default PrivacyPolicyPage
