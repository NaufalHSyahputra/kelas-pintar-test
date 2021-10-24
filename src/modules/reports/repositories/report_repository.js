const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllStudentReports = async () => {
  const reports = await prisma.$queryRaw`
    select
        students.id student_id,
        students."name",
        subjects.subject_name ,
        students.grade,
        AVG(reports.score)
    from
        reports
    join subjects on
        subjects.id = reports.subject_id
    join students on
        students.id = reports.student_id
    group by
        subjects.subject_name,
        students.grade,
        students."name",
        students.id
  `;
  return reports;
};

exports.getGradeAverage = async () => {
  const gradeAverages = await prisma.$queryRaw`
    select
        s.subject_name,
        s.grade,
        AVG(score)
    from
        reports r
    join subjects s on
        s.id = r.subject_id
    group by
        s.subject_name,
        s.grade
    `;
  return gradeAverages;
};

exports.getAverageAllStudentScore = async () => {
  const students = await prisma.$queryRaw`
    select
      avg_chapter.id,
      avg_chapter."name",
      avg_chapter.grade,
      AVG(avg_chapter.avg_score)
  from
      (
      select
          students.id,
          students."name" ,
          subjects.subject_name ,
          students.grade,
          AVG(reports.score) avg_score
      from
          reports
      join subjects on
          subjects.id = reports.subject_id
      join students on
          students.id = reports.student_id
      group by
          students."name" ,
          subjects.subject_name,
          students.grade,
          students.id
      ) avg_chapter
  group by
      avg_chapter."name",
      avg_chapter.grade,
      avg_chapter.id
    `;
  return students;
};
