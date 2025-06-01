import React, { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 text-base leading-relaxed">
      {/* Go back button */}
      <div className="mb-4">
        <Link
          to="/"
          className="text-blue-500 hover:underline flex items-center gap-x-2"
        >
          <FaArrowLeftLong /> Go back
        </Link>
      </div>
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p>
        At <strong>95BikeRentals</strong>, we respect your privacy and are
        committed to protecting your personal information. This Privacy Policy
        explains how we collect, use, and safeguard your data when you visit our
        website and use our bike rental services.
      </p>

      <h2 className="text-2xl font-semibold">Information Collection and Use</h2>
      <p>
        We collect personal information, such as your name, email, phone number,
        and payment details, when you:
      </p>
      <ul className="list-disc list-inside">
        <li>Book a bike on our website</li>
        <li>Contact us for support or inquiries</li>
      </ul>
      <p>
        We use this information to process your bookings, communicate with you,
        improve our services, and process secure payments via Razorpay. We do
        not store your payment details; all transactions are securely handled
        through Razorpay.
      </p>

      <h2 className="text-2xl font-semibold">Log Data</h2>
      <p>
        When you use our website, we may collect log data such as your IP
        address, browser type, pages visited, and time spent. This data helps us
        analyze traffic and improve our service.
      </p>

      <h2 className="text-2xl font-semibold">Cookies</h2>
      <p>
        We use cookies to enhance your browsing experience. You can choose to
        disable cookies in your browser settings, though some features of the
        site may not function properly.
      </p>

      <h2 className="text-2xl font-semibold">Security</h2>
      <p>
        We value your trust and use commercially acceptable measures to protect
        your personal data. However, please note that no online method is 100%
        secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-2xl font-semibold">Links to Other Sites</h2>
      <p>
        Our website may contain links to third-party websites. We are not
        responsible for the privacy practices or content of these external sites
        and encourage you to review their privacy policies.
      </p>

      <h2 className="text-2xl font-semibold">Children’s Privacy</h2>
      <p>
        Our services are not intended for children under 13. We do not knowingly
        collect personal information from children. If you believe your child
        has provided us with information, please contact us so we can remove it.
      </p>

      <h1 className="text-3xl font-bold mt-10">Terms and Conditions</h1>

      <h2 className="text-2xl font-semibold">Eligibility</h2>
      <p>
        You must be at least 18 years old and have a valid government-issued ID
        to rent a bike.
      </p>

      <h2 className="text-2xl font-semibold">Rental Responsibilities</h2>
      <ul className="list-disc list-inside">
        <li>You are responsible for the bike during the rental period.</li>
        <li>Any damage, theft, or loss will be charged to you.</li>
        <li>
          Bikes must be returned in the same condition as provided, excluding
          normal wear and tear.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold">Usage Restrictions</h2>
      <ul className="list-disc list-inside">
        <li>No illegal activities, racing, or stunts.</li>
        <li>We recommend using safety equipment, including helmets.</li>
      </ul>

      <h2 className="text-2xl font-semibold">Payments</h2>
      <p>
        All payments are processed securely through Razorpay. Bookings are
        confirmed only after full payment is received.
      </p>

      <h1 className="text-3xl font-bold mt-10">
        Cancellation and Refund Policy
      </h1>

      <h2 className="text-2xl font-semibold">Cancellations</h2>
      <ul className="list-disc list-inside">
        <li>24 hours or more before the rental start time → Full refund.</li>
        <li>
          Less than 24 hours before the rental start time → 50% cancellation
          fee.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold">No-show Policy</h2>
      <p>
        If you fail to pick up the bike without prior cancellation, no refund
        will be issued.
      </p>

      <h2 className="text-2xl font-semibold">Refund Processing</h2>
      <p>
        Refunds will be processed to your original payment method within 5–7
        business days.
      </p>

      <h1 className="text-3xl font-bold mt-10">Shipping and Delivery</h1>

      <h2 className="text-2xl font-semibold">Pick-up and Delivery</h2>
      <p>
        We primarily offer in-store pick-up. Delivery services (if available)
        must be arranged in advance and may involve additional charges, which
        will be communicated during booking.
      </p>

      <h2 className="text-2xl font-semibold">Delivery Areas</h2>
      <p>
        Delivery is only available in specific areas. Please check availability
        on the website before selecting this option.
      </p>

      <h2 className="text-2xl font-semibold">Delivery Timing</h2>
      <p>
        We aim to deliver on time but are not responsible for delays due to
        traffic, weather, or other unforeseen circumstances.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
      <p>
        If you have any questions or concerns, please contact us at:
        <br /> 📧 <strong>support@95bikerentals.com</strong>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
