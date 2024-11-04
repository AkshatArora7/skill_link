import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../Assets/logo.png";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  logo: {
    width: "50%",
    margin: "0 auto 20px auto",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
  },
});

const PolicyPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={logo} style={styles.logo} />
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.text}>Last Updated: [Date]</Text>
      <Text style={styles.text}>
        Welcome to Skill Link, a platform that connects customers seeking
        services from skilled professionals such as plumbers, electricians, and
        carpenters. By accessing or using our services, you agree to comply with
        and be bound by the following Terms and Conditions. Please read them
        carefully.
      </Text>
      <Text style={styles.subtitle}>1. Acceptance of Terms</Text>
      <Text style={styles.text}>
        By creating an account or using our services, you acknowledge that you
        have read, understood, and agree to be bound by these Terms and
        Conditions. If you do not agree, you must not access or use our
        services.
      </Text>
      <Text style={styles.subtitle}>2. Definitions</Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>- "Customers"</Text>: Users seeking
        to book services from skilled professionals.
        {"\n"}
        <Text style={{ fontWeight: "bold" }}>- "Clients"</Text>: Skilled
        professionals providing services such as plumbing, electrical work, or
        carpentry.
        {"\n"}
        <Text style={{ fontWeight: "bold" }}>- "Services"</Text>: All services
        provided through the Skill Link platform.
      </Text>
      <Text style={styles.subtitle}>3. User Accounts</Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>3.1 Registration</Text>: To use the
        services, you must register for an account. You agree to provide
        accurate, current, and complete information during the registration
        process and to update such information to keep it accurate, current, and
        complete.
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>3.2 Security</Text>: You are
        responsible for maintaining the confidentiality of your account
        credentials and are fully responsible for all activities that occur
        under your account. You agree to notify us immediately of any
        unauthorized use of your account or any other breach of security.
      </Text>
      <Text style={styles.subtitle}>4. Services Provided</Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>4.1 For Customers</Text>: Customers
        can browse profiles of various clients (plumbers, electricians,
        carpenters, etc.).
      </Text>
      <Text style={styles.text}>
        <Text style={{ fontWeight: "bold" }}>4.2 For Clients</Text>: Clients
        will receive email notifications for new booking requests. Clients can
        accept or decline booking requests. Clients will manage their profiles
        and service offerings through their portal.
      </Text>
      <Text style={styles.subtitle}>5. Booking Process</Text>
      <Text style={styles.text}>
        Once a customer books a service, the client will receive an email
        notification. Clients have the option to accept or decline the booking.
        Customers will be able to see if their booking has been accepted or
        declined in the app.
      </Text>
      <Text style={styles.subtitle}>6. Payment Terms</Text>
      <Text style={styles.text}>
        All payments are processed securely through our platform. Customers will
        be charged once the client accepts their booking. Pricing for services
        will be displayed on the client’s profile.
      </Text>
      <Text style={styles.subtitle}>7. Cancellation Policy</Text>
      <Text style={styles.text}>
        Customers can cancel bookings within 24 hours of the scheduled service.
        Clients will be notified of the cancellation.
      </Text>
      <Text style={styles.subtitle}>8. Limitation of Liability</Text>
      <Text style={styles.text}>
        Skill Link is not responsible for any damages, losses, or claims arising
        out of or related to your use of our services. We do not guarantee the
        quality or availability of the services provided by clients.
      </Text>
      <Text style={styles.subtitle}>9. Changes to Terms</Text>
      <Text style={styles.text}>
        We reserve the right to modify these Terms and Conditions at any time.
        Any changes will be effective immediately upon posting on our platform.
        Your continued use of the services constitutes acceptance of the revised
        terms.
      </Text>
      <Text style={styles.subtitle}>10. Governing Law</Text>
      <Text style={styles.text}>
        These Terms and Conditions shall be governed by and construed in
        accordance with the laws of the jurisdiction in which Skill Link
        operates.
      </Text>
      <Text style={styles.subtitle}>11. Contact Information</Text>
      <Text style={styles.text}>
        If you have any questions about these Terms and Conditions, please
        contact us at support@skill-link.com.
      </Text>
    </Page>
  </Document>
);

const Policy = () => {
  return (
    <div className="p-6 overflow-y-auto max-h-[80vh]">
      <img src={logo} alt="Skill Link Logo" className="mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
      <h3 className="font-bold mb-4">Last Updated: [Date]</h3>
      <p className="mb-4">
        Welcome to Skill Link, a platform that connects customers seeking
        services from skilled professionals such as plumbers, electricians, and
        carpenters. By accessing or using our services, you agree to comply with
        and be bound by the following Terms and Conditions. Please read them
        carefully.
      </p>

      <h3 className="font-semibold mt-4">1. Acceptance of Terms</h3>
      <p>
        By creating an account or using our services, you acknowledge that you
        have read, understood, and agree to be bound by these Terms and
        Conditions. If you do not agree, you must not access or use our
        services.
      </p>

      <h3 className="font-semibold mt-4">2. Definitions</h3>
      <p className="font-semibold">- "Customers":</p>
      <p>Users seeking to book services from skilled professionals.</p>
      <p className="font-semibold">- "Clients":</p>
      <p>
        Skilled professionals providing services such as plumbing, electrical
        work, or carpentry.
      </p>
      <p className="font-semibold">- "Services":</p>
      <p>All services provided through the Skill Link platform.</p>

      <h3 className="font-semibold mt-4">3. User Accounts</h3>
      <h4 className="font-semibold mt-2">3.1 Registration</h4>
      <p>
        To use the services, you must register for an account. You agree to
        provide accurate, current, and complete information during the
        registration process and to update such information to keep it accurate,
        current, and complete.
      </p>
      <h4 className="font-semibold mt-2">3.2 Security</h4>
      <p>
        You are responsible for maintaining the confidentiality of your account
        credentials and are fully responsible for all activities that occur
        under your account. You agree to notify us immediately of any
        unauthorized use of your account or any other breach of security.
      </p>

      <h3 className="font-semibold mt-4">4. Services Provided</h3>
      <h4 className="font-semibold mt-2">4.1 For Customers</h4>
      <p>
        Customers can browse profiles of various clients (plumbers,
        electricians, carpenters, etc.).
      </p>
      <h4 className="font-semibold mt-2">4.2 For Clients</h4>
      <p>
        Clients will receive email notifications for new booking requests.
        Clients can accept or decline booking requests. Clients will manage
        their profiles and service offerings through their portal.
      </p>

      <h3 className="font-semibold mt-4">5. Booking Process</h3>
      <p>
        Once a customer books a service, the client will receive an email
        notification. Clients have the option to accept or decline the booking.
        Customers will be able to see if their booking has been accepted or
        declined in the app.
      </p>

      <h3 className="font-semibold mt-4">6. Payment Terms</h3>
      <p>
        All payments are processed securely through our platform. Customers will
        be charged once the client accepts their booking. Pricing for services
        will be displayed on the client’s profile.
      </p>

      <h3 className="font-semibold mt-4">7. Cancellation Policy</h3>
      <p>
        Customers can cancel bookings within 24 hours of the scheduled service.
        Clients will be notified of the cancellation.
      </p>

      <h3 className="font-semibold mt-4">8. Limitation of Liability</h3>
      <p>
        Skill Link is not responsible for any damages, losses, or claims arising
        out of or related to your use of our services. We do not guarantee the
        quality or availability of the services provided by clients.
      </p>

      <h3 className="font-semibold mt-4">9. Changes to Terms</h3>
      <p>
        We reserve the right to modify these Terms and Conditions at any time.
        Any changes will be effective immediately upon posting on our platform.
        Your continued use of the services constitutes acceptance of the revised
        terms.
      </p>

      <h3 className="font-semibold mt-4">10. Governing Law</h3>
      <p>
        These Terms and Conditions shall be governed by and construed in
        accordance with the laws of the jurisdiction in which Skill Link
        operates.
      </p>

      <h3 className="font-semibold mt-4">11. Contact Information</h3>
      <p>
        If you have any questions about these Terms and Conditions, please
        contact us at support@skill-link.com.
      </p>

      <div className="mt-6">
        <PDFDownloadLink
          document={<PolicyPDF />}
          fileName="Terms_and_Conditions.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download Terms and Conditions"
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default Policy;
