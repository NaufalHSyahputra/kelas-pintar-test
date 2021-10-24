/* eslint-disable no-await-in-loop */
const { PrismaClient } = require("@prisma/client");
const faker = require("faker/locale/id_ID");

const prisma = new PrismaClient();
const TOTAL_USER_EACH_GRADE = 5;
const TOTAL_REPORT_EACH_GRADE = 50;

const groupBy = (xs, key) =>
  xs.reduce((rv, x) => {
    // eslint-disable-next-line no-param-reassign
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, []);

const grades = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

async function truncateAllTables() {
  await prisma.$queryRaw`truncate subjects,chapters,reports, students RESTART IDENTITY;`;
}

async function seedStudent() {
  grades.forEach(async (value) => {
    for (let index = 0; index < TOTAL_USER_EACH_GRADE; index += 1) {
      await prisma.student.create({
        data: {
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          grade: value,
        },
      });
    }
  });
}

async function seedSubject() {
  let tester = [];
  grades.forEach(async (value) => {
    tester = [
      ...tester,
      { subject_name: "Math", grade: value },
      { subject_name: "English", grade: value },
      { subject_name: "Indonesian", grade: value },
      { subject_name: "Science", grade: value },
    ];
  });
  await prisma.subject.createMany({
    data: tester,
  });
}

async function seedChapter() {
  const subjects = await prisma.subject.findMany();
  const chapters = [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4",
    "Chapter 5",
  ];
  const subjectsID = groupBy(subjects, "grade");
  const tester = [];
  subjectsID
    .filter((value) => value !== null)
    .forEach(async (value, key) => {
      value.forEach(async (valuee) => {
        for (let index = 0; index < chapters.length; index += 1) {
          const test = {
            chapter_name: chapters[index],
            grade: (key + 1).toString(),
            subject_id: valuee.id,
          };
          tester.push(test);
        }
      });
    });
  await prisma.chapter.createMany({
    data: tester,
  });
}

async function seedReport() {
  grades.forEach(async (val) => {
    const data = [];
    for (let index = 0; index < TOTAL_REPORT_EACH_GRADE; index += 1) {
      // get random chapter
      const chapter =
        await prisma.$queryRaw`SELECT id, grade, subject_id FROM chapters WHERE grade = ${val} ORDER BY random() LIMIT 1;`;
      // get random student by grade from random chapter
      const student =
        await prisma.$queryRaw`SELECT id FROM students WHERE grade = ${val} ORDER BY random() LIMIT 1`;
      const score = Math.floor(Math.random() * 101);
      data.push({
        student_id: student[0].id,
        subject_id: chapter[0].subject_id,
        chapter_id: chapter[0].id,
        grade: val,
        score,
      });
    }
    await prisma.report.createMany({
      data,
    });
  });
}

async function doSeed() {
  await truncateAllTables();
  await seedStudent();
  await seedSubject();
  await seedChapter();
  await seedReport();
}
doSeed();
