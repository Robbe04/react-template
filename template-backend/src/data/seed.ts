import { PrismaClient } from '@prisma/client';
import Role from "../core/roles"
import { hashPassword } from '../core/password';

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
      { productName: "Iphone 11", image: "iphone_11.jpg", unitPrice: 899.99, categoryId: 1, supplierId: 1, unitsInStock : 50 },
      { productName: "Iphone 13 pro", image: "iphone_13_pro.jpg", unitPrice: 1199.99, categoryId: 1, supplierId: 1, unitsInStock : 30 },
      { productName: "Windows laptop", image: "windows_laptop.jpg", unitPrice: 899.99, categoryId: 2, supplierId: 2, unitsInStock : 25 },
    ],
  });

  // Wachtwoorden hashen voor de gebruikers
  const password1 = await hashPassword('password1')
  const password2 = await hashPassword('password2')
  const password3 = await hashPassword('password3')

  // Voeg gebruikers toe
  await prisma.user.createMany({
    data: [
      { firstName: "John", lastName: "Doe", emailadres: "john.doe@gmail.com", image : "johndoe.jpg", password : password1, roles : JSON.stringify([Role.ADMIN, Role.USER]), },
      { firstName: "Thomas", lastName: "Cooper", emailadres: "thomas.cooper@gmail.com", image : "thomascooper.jpg", password : password2, roles : JSON.stringify([Role.USER]), },
      { firstName: "Barley", lastName: "Nutorious", emailadres: "barley.nutorious@gmail.com", image : "barleynutorious.jpg", password : password3, roles : JSON.stringify([Role.USER]),  },
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
