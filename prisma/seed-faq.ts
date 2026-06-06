import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const items = [
  {
    question: "What types of entities can Exxonim help register?",
    answer:
      "Exxonim supports registration for companies, NGOs, and business names. The team guides you through entity type selection, document preparation, and authority submission.",
    category: "registration",
    sort_order: 1,
  },
  {
    question: "How long does company registration take?",
    answer:
      "Timelines depend on the entity type and authority processing speed. Exxonim tracks every submission and follows up proactively so you always know where things stand.",
    category: "registration",
    sort_order: 2,
  },
  {
    question: "What is a TIN and do I need one?",
    answer:
      "A Tax Identification Number is required for most registered entities in Tanzania. Exxonim handles TIN applications as part of the setup process.",
    category: "tax",
    sort_order: 3,
  },
  {
    question: "Can I track the status of my consultation?",
    answer:
      "Yes. Every consultation is assigned a reference ID. You can use it to check what is complete, what is pending, and what comes next at every stage.",
    category: "tracking",
    sort_order: 4,
  },
  {
    question: "What happens after I submit a request?",
    answer:
      "The Exxonim team reviews your case, confirms the required documents, and prepares the filing sequence. You receive a reference ID to track progress throughout.",
    category: "general",
    sort_order: 5,
  },
  {
    question: "Does Exxonim handle licensing renewals?",
    answer:
      "Yes. Exxonim tracks renewal deadlines, prepares the required documents, and submits renewals on your behalf so obligations do not lapse.",
    category: "licensing",
    sort_order: 6,
  },
];

async function main() {
  console.log("Seeding FAQ items...");

  // Clear existing items first for idempotency
  await prisma.faqItem.deleteMany({});

  for (const item of items) {
    await prisma.faqItem.create({
      data: item,
    });
  }

  const count = await prisma.faqItem.count();
  console.log(`Seeded ${count} FAQ items.`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
