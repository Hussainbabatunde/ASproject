import React, { useEffect } from "react";
import "../LandingHomepage/Homepage.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Homepage/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ScoutHeader from "../../Components/Header/ScoutHeader";

const TermCondition = () => {
  const userData = useSelector((state) => state.reducer.LoginSlice?.logindata);

  return (
    <div>
      <div className="max-w-[1400px] mx-auto shadow-lg">
        {userData ? <ScoutHeader /> : <Header />}
        {/* <div className="Homepage_contents"> */}
        <div className="Homepricingpage_section flex flex-col lg:flex-row min-h-[90vh] px-[2rem] md:px-[8rem] items-center justify-between">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">
              AFRISPORTPRO LTD TERMS AND CONDITIONS
            </h1>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                1. Purpose and Usage:
              </h2>
              <p className="mb-4">
                <span className="text-green-600">a. Platform Purpose:</span>{" "}
                Afrisportpro Ltd. stands firm in its commitment to serve as a
                pivotal talent scouting platform. Our core mission is to
                establish a vibrant and reliable marketplace. This marketplace
                is tailored to assist scouts, agents, managers, clubs, and other
                entities that operate within the sporting realm, allowing them
                to effortlessly uncover and acquire the services of budding
                talents, thereby facilitating a seamless integration of talent
                into suitable professional environments.
              </p>
              <p>
                <span className="text-green-600">b. Appropriate Use:</span> Our
                platform has been intricately designed and developed to cater
                exclusively to the needs of talent scouting, as well as other
                ancillary sporting services and operations. We emphasize the
                importance of maintaining the sanctity of our platform’s
                intended use. Users are therefore urged to align their
                activities on the platform with its core objectives, as any
                digression may not only dilute the platform's essence but is
                strictly forbidden.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                2. Prohibited Uses:
              </h2>
              <p className="mb-4">
                Afrisportpro Ltd. maintains a clear stance on activities that
                are incompatible with our platform's intended use. Users are
                firmly advised against the following practices:
              </p>
              <ol className="list-decimal list-inside pl-4">
                <li>
                  <span className="text-green-600">a.</span> Engaging directly
                  or indirectly in activities that can be associated with
                  illegal human trafficking. This not only compromises the
                  integrity of our platform but also contravenes international
                  laws and norms.
                </li>
                <li>
                  <span className="text-green-600">b.</span> Repurposing our
                  platform as a conduit for dating or romantic pursuits.
                  Afrisportpro Ltd. is not, and should not be mistaken for, a
                  matchmaking or dating service.
                </li>
                <li>
                  <span className="text-green-600">c.</span> Using the platform
                  as a medium to advocate, boost, or immerse in political
                  campaigns, endorsements, or any activities of a similar
                  nature. Our primary focus remains talent scouting, and we seek
                  to prevent any dilution of this focus.
                </li>
                <li>
                  <span className="text-green-600">d.</span> Leveraging the
                  platform to seek financial contributions, endorsements, or any
                  forms of monetary aid. The platform is not a fundraising tool,
                  and any attempts to use it as such will be met with strict
                  measures.
                </li>
                <li>
                  <span className="text-green-600">e.</span> Utilizing the
                  platform as an alternative to popular social media or
                  messaging platforms. It's pivotal to understand that while we
                  offer communication tools, these are purely to facilitate
                  talent scouting and should not be used for generic social
                  interactions divergent from our primary goal.
                </li>
              </ol>
            </section>

            {/* Continue with the rest of the content... */}

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                3. User Responsibilities:
              </h2>
              <p className="mb-4">
                <span className="text-green-600">a.</span> Account Integrity:
                Every user has an intrinsic duty to safeguard their account
                details. This includes:
              </p>
              <ul className="list-disc list-inside pl-4">
                <li>i. Regularly updating passwords to ensure robustness.</li>
                <li>
                  ii. Refraining from sharing login details with any third
                  parties.
                </li>
                <li>
                  iii. Being vigilant about potential phishing scams or
                  suspicious activities related to account access.
                </li>
                <li>
                  iv. Immediately reporting any instance of unauthorized access
                  or suspicious activities related to their Afrisportpro Ltd.
                  account to our support team.
                </li>
              </ul>
              <p>
                <span className="text-green-600">b.</span> Content Sharing:
                Afrisportpro Ltd. thrives on the authenticity and relevance of
                the content shared by its users. Thus, when sharing:
              </p>
              <ol className="list-decimal list-inside pl-4">
                <li>
                  i. Ensure content is directly aligned with the platform's
                  purpose—talent scouting and sports.
                </li>
                <li>
                  ii. Refrain from posting copyrighted content unless you hold
                  the rights or have obtained explicit permission.
                </li>
                <li>
                  iii. Regularly review and update content to maintain its
                  relevance and accuracy.
                </li>
              </ol>
              <p>
                <span className="text-green-600">c.</span> Respectful Conduct: A
                harmonious community is built on mutual respect. We implore
                users to:
              </p>
              <ol className="list-decimal list-inside pl-4">
                <li>
                  i. Avoid any language or behavior that could be construed as
                  offensive, derogatory, or harmful.
                </li>
                <li>
                  ii. Foster positive interactions and constructive feedback.
                </li>
                <li>
                  iii. Report any instances of bullying, harassment, or other
                  malicious behavior.
                </li>
              </ol>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                4. Platform Limitations:
              </h2>
              <p className="mb-4">
                <span className="text-green-600">a.</span> Availability:
              </p>
              <ol className="list-decimal list-inside pl-4">
                <li>
                  i. Occasional downtimes might be necessary for system
                  upgrades, maintenance, or due to technical glitches.
                </li>
                <li>
                  ii. Users are advised to save their work periodically to avoid
                  data loss during unforeseen downtimes.
                </li>
              </ol>
              <p>
                <span className="text-green-600">b.</span> Third-Party Links:
              </p>
              <ol className="list-decimal list-inside pl-4">
                <li>
                  i. Links to external websites are provided for added
                  convenience and do not signify an endorsement.
                </li>
                <li>
                  ii. Users are advised to exercise discretion when visiting
                  third-party sites and to familiarize themselves with their
                  respective terms and privacy policies.
                </li>
              </ol>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                5. Termination and Consequences:
              </h2>
              <p className="mb-4">
                <span className="text-green-600">a.</span> Afrisportpro Ltd.
                upholds its terms with strict adherence and expects its users to
                do the same. Any deviations might lead to:
              </p>
              <ol className="list-decimal list-inside pl-4">
                <li>i. Temporary suspension pending investigation.</li>
                <li>
                  ii. Permanent account termination for repeated or severe
                  violations.
                </li>
              </ol>
              <p>
                <span className="text-green-600">b.</span> For serious
                infractions that threaten the platform's integrity or its users'
                safety, legal recourse might be sought, in addition to
                platform-specific actions.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                6. Feedback and Suggestions:
              </h2>
              <p className="mb-4">
                <span className="text-green-600">a.</span> Your voice matters to
                us:
              </p>
              <ol className="list-decimal list-inside pl-4">
                <li>
                  i. While feedback is invaluable for our growth, users should
                  be aware that once shared, Afrisportpro Ltd. may use it freely
                  for improvements, marketing, or other purposes.
                </li>
                <li>
                  ii. Feedback is taken in good faith, and while every
                  suggestion is reviewed, implementation is at the discretion of
                  Afrisportpro Ltd.
                </li>
              </ol>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                7. Changes to Terms and Conditions:
              </h2>
              <p className="mb-4">
                <span className="text-green-600">a.</span> As the platform
                evolves:
              </p>
              <ol className="list-decimal list-inside pl-4">
                <li>
                  i. Afrisportpro Ltd. might find it necessary to amend the
                  terms periodically.
                </li>
                <li>
                  ii. Users are advised to stay updated with the latest terms to
                  ensure continued compliance.
                </li>
                <li>
                  iii. Your trust, safety, and satisfaction remain our top
                  priority. Your continued association with Afrisportpro Ltd.
                  signifies acceptance of our terms, and we look forward to a
                  fruitful journey together.
                </li>
              </ol>
            </section>

            <section className="mb-6">
              <div className="container mx-auto mt-4">
                <h2 className="text-2xl font-semibold mb-4">
                  8. Data Collection:
                </h2>
                <p>
                  At Afrisportpro Ltd., we prioritize our users' trust and
                  transparency. As part of our commitment to this trust, we
                  detail the information we might request from you and its
                  relevance:
                </p>

                <ul className="list-disc list-inside pl-4">
                  <li>
                    <span className="text-green-600">a.</span> Personal Details:
                    This can encompass an array of details such as your name,
                    date of birth, country of origin, gender, and other relevant
                    demographics. Such information assists us in understanding
                    our user base better and in tailoring our services
                    effectively.
                  </li>
                  <li>
                    <span className="text-green-600">b.</span> Identification
                    Details: To ensure a safe and trustworthy platform, users
                    may be required to submit certain identification proofs.
                    These can range from government-issued IDs, licenses, or
                    other documents that verify an individual's identity.
                  </li>
                  <li>
                    <span className="text-green-600">c.</span> Contact
                    Information: Email addresses, phone numbers, and other
                    similar contact details are crucial. They allow us to
                    communicate important platform updates, security
                    notifications, and more.
                  </li>
                  <li>
                    <span className="text-green-600">d.</span> Professional
                    Background: Knowledge of your previous affiliations, club
                    history, and present workplace or affiliations helps us in
                    curating a bespoke experience for you. It also assists
                    others on the platform in understanding your professional
                    trajectory and expertise.
                  </li>
                  <li>
                    <span className="text-green-600">e.</span> Multimedia
                    Content: Pictures, videos, and other multimedia resources
                    help in creating a comprehensive profile. These aid scouts
                    and other stakeholders in making informed decisions.
                  </li>
                  <li>
                    <span className="text-green-600">f.</span> Activity Data:
                    This may include your interactions with the platform, search
                    queries, and other behavioral data which aids in improving
                    platform functionality and user experience.
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-6">
              <div className="container mx-auto mt-4">
                <h2 className="text-2xl font-semibold mb-4">9. Data Usage:</h2>
                <p>
                  We believe in using the collected data judiciously and with
                  utmost responsibility. Here's a detailed perspective on how we
                  use your data:
                </p>

                <ul className="list-disc list-inside pl-4">
                  <li>
                    <span className="text-green-600">a.</span> User
                    Authenticity: To maintain a genuine community of
                    professionals and stakeholders, we use the data to verify
                    the legitimacy of our users, ensuring that everyone
                    interacts in a secure and trustworthy environment.
                  </li>
                  <li>
                    <span className="text-green-600">b.</span> Talent
                    Evaluation: Before talents are onboarded, the data helps us
                    and other stakeholders evaluate the qualifications, skills,
                    and expertise of individuals, ensuring that only those
                    meeting certain criteria are presented on the platform.
                  </li>
                  <li>
                    <span className="text-green-600">c.</span> Platform Safety:
                    Our users' safety is paramount. By analyzing the provided
                    data, we can identify and take preemptive actions against
                    potential threats, ensuring that our community remains safe
                    from malicious entities like traffickers, spammers, and
                    scammers.
                  </li>
                  <li>
                    <span className="text-green-600">d.</span> Personalized
                    Experience: Data assists us in understanding user
                    preferences, enabling us to curate a more personalized and
                    seamless user experience.
                  </li>
                  <li>
                    <span className="text-green-600">e.</span> Continuous
                    Improvement: User data aids in understanding platform
                    strengths and areas of improvement. It informs our decisions
                    when enhancing functionalities, offering new features, or
                    introducing updates.
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                10. Data Protection and Privacy:
              </h2>
              <p className="mb-4">
                <span className="text-green-600">a.</span> Afrisportpro Ltd.
                employs state-of-the-art security measures to ensure that user
                data remains protected against unauthorized access, alterations,
                or breaches. Regular audits and reviews are conducted to fortify
                our data protection strategies.
              </p>
              <p>
                <span className="text-green-600">b.</span> We adhere to global
                privacy standards and regulations, ensuring that user rights
                concerning their data are always upheld. Users have the right to
                access, modify, or request deletion of their data as per
                applicable laws.
              </p>
              <p>
                <span className="text-green-600">c.</span> By using Afrisportpro
                Ltd., you consent to the collection and use of your data as
                described above. We advise users to regularly review our terms
                and policies to stay informed about our data practices.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                11. Disclaimer and User Acknowledgment:
              </h2>
              <p className="mb-4">
                <span className="text-green-600">a.</span> Afrisport Pro
                Responsibilities: Afrisport Pro serves as a platform that
                bridges the gap between talents and scouting entities. While we
                facilitate these connections, we would like to clarify our
                stance on certain responsibilities:
              </p>
              <ol className="list-decimal list-inside pl-4">
                <li>
                  i. International Trips: Afrisport Pro does not have any
                  obligation, neither expressed nor implied, to fund, sponsor,
                  or manage international or local trips for talents discovered
                  on the platform. Talents, scouts, or their representatives
                  must handle such logistical arrangements independently.
                </li>
                <li>
                  ii. Financial Agreements: Afrisport Pro operates as a talent
                  discovery and networking platform. As such, we are not
                  involved in the financial negotiations, agreements, or
                  transactions between talents and scouts or any other third
                  parties. We do not guarantee, oversee, or bear responsibility
                  for any financial commitments, valuations, or settlements that
                  might be negotiated or proposed on or off our platform.
                </li>
              </ol>
              <p>
                <span className="text-green-600">b.</span> User Acknowledgment:
              </p>
              <ol className="list-decimal list-inside pl-4">
                <li>
                  i. Consent to Terms: By accessing and using the services of
                  Afrisportpro Ltd., users expressly acknowledge and understand
                  the platform's terms, policies, and operating procedures. This
                  understanding signifies your complete acceptance and
                  willingness to comply with our established guidelines.
                </li>
                <li>
                  ii. Violations and Consequences: Afrisportpro Ltd. upholds its
                  standards rigorously. Users found to be in breach of our Terms
                  and Conditions may face actions that include but are not
                  limited to the suspension or termination of their account.
                  Furthermore, where necessary and appropriate, legal actions
                  may be initiated to protect the platform's integrity and its
                  user community.
                </li>
                <li>
                  iii. Continuous Engagement: We recommend and encourage our
                  users to frequently review our Terms and Conditions, along
                  with other related policies, to stay updated and ensure
                  continued compliance.
                </li>
                <li>
                  iv. Your trust and cooperation are invaluable to us. We thank
                  you for choosing Afrisportpro Ltd. and hope for a fruitful
                  association.
                </li>
              </ol>
              <p>
                We reserve the right to amend these Terms and Conditions at any
                time, and it is the responsibility of the user to stay updated
                with such changes. Date: [Insert Date of Last Update] Thank you
                for choosing Afrisportpro Ltd.
              </p>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TermCondition;
