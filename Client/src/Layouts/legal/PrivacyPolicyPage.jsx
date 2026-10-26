import LegalPageLayout from './LegalPageLayout'

const PrivacyPolicyPage = () => (
  <LegalPageLayout
    title="Privacy Policy"
    description="Learn what information DevVault stores and how it is used."
    path="/privacy-policy"
  >
    <p>
      This policy describes how DevVault handles information when you use the website. Supabase Auth manages
      account sessions, and snippets are sent to the DevVault API and stored in the configured Supabase database.
      Profile settings are stored locally in your browser.
    </p>

    <section>
      <h2 className="text-xl font-semibold text-[#E7E9EE]">Information you provide</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li>Snippets you save are associated with your signed-in account and stored in the Supabase database configured for the service.</li>
        <li>Your email and authentication session are managed by Supabase Auth. The client sends an access token to the API to authorize snippet operations.</li>
        <li>Profile details and an optional avatar are saved in browser local storage on this device.</li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#E7E9EE]">How information is used</h2>
      <p className="mt-3">
        Information is used to provide the features you request, authenticate your account, and store your account's snippets.
        The client does not include an analytics package in its current
        implementation.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#E7E9EE]">Storage and service providers</h2>
      <p className="mt-3">
        Snippets are stored in the configured Supabase database and can be deleted from your account through Settings.
        Profile data remains in browser local storage until you remove it or clear browser data. Supabase Auth
        provides account authentication; the API verifies access tokens and scopes snippet operations to the account.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-[#E7E9EE]">Your choices and data safety</h2>
      <p className="mt-3">
        You can delete snippets through the app and remove profile data through your browser settings. Profile
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
