import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Voeg categorieën toe
  await prisma.category.createMany({
    data: [
      { categoryName: "iphone" },
      { categoryName: "laptop" },
    ],
  });

  // Voeg leveranciers toe
  await prisma.supplier.createMany({
    data: [
      { firstName: 'Kurt', lastName: "Mathijs", company: "Bertha NV" },
      { firstName: 'Brenda', lastName: "Mclifius", company: "Mcflow NV" },
      { firstName: 'Cooper', lastName: "Magerman", company: "Okay" },
    ],
  });

  // Voeg producten toe
  await prisma.product.createMany({
    data: [
      { productName: "Iphone 11", image: "iphone_11.jpg", unitPrice: 899.99, categoryId: 1, supplierId: 1 },
      { productName: "Iphone 13 pro", image: "iphone_13_pro.jpg", unitPrice: 1199.99, categoryId: 1, supplierId: 1 },
      { productName: "Windows laptop", image: "windows_laptop.jpg", unitPrice: 899.99, categoryId: 2, supplierId: 2 },
    ],
  });

  // Voeg gebruikers toe
  await prisma.user.createMany({
    data: [
      { firstName: "John", lastName: "Doe", emailadres: "john.doe@gmail.com" },
      { firstName: "Thomas", lastName: "Cooper", emailadres: "thomas.cooper@gmail.com" },
      { firstName: "Barley", lastName: "Nutorious", emailadres: "barley.nutorious@gmail.com" },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
