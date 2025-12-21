import React from "react";

const reasons = [
  {
    icon: "🚚",
    title: "Fast Delivery",
    description:
      "We ensure your books reach you quickly, anywhere in Bangladesh.",
  },
  {
    icon: "💳",
    title: "Secure Payment",
    description: "Safe and convenient payment options with instant confirmation.",
  },
  {
    icon: "📚",
    title: "Wide Selection",
    description:
      "Thousands of books from all genres, curated by expert librarians.",
  },
  {
    icon: "🤝",
    title: "Excellent Support",
    description:
      "Our friendly support team is ready to help with any questions.",
  },
];

const WhyChoose = () => {
  return (
    <section className="my-16 px-4 md:px-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Why Choose <span className="text-blue-600">BookCourier</span>
        </h2>
        <p className="mt-4 text-gray-600">
          BookCourier makes buying books easier, faster, and safer than anywhere else.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition"
          >
            <div className="text-5xl mb-4">{reason.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
            <p className="text-gray-500">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
